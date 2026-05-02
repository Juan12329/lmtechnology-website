import html
import os
import re
import smtplib
import sqlite3
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory


BASE_DIR = Path(__file__).resolve().parent


def load_env_file(filename):
    path = BASE_DIR / filename
    if not path.exists():
        return

    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        os.environ.setdefault(key, value.strip().strip('"').strip("'"))


load_env_file(".env")
load_env_file(".env.local")


PORT = int(os.environ.get("PORT", "5000"))
HOST = os.environ.get("HOST", "127.0.0.1")
BUSINESS_EMAIL = os.environ.get("BUSINESS_EMAIL", "hello.lmtechnology@gmail.com")
SMTP_USER = os.environ.get("SMTP_USER", BUSINESS_EMAIL)
SMTP_PASS = os.environ.get("SMTP_PASS")
SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
DATA_DIR = Path(os.environ.get("DATA_DIR", BASE_DIR / "data"))
DB_PATH = Path(os.environ.get("DB_PATH", DATA_DIR / "lmtechnology.sqlite"))
DIST_DIR = BASE_DIR / "dist"
DEFAULT_ALLOWED_ORIGINS = (
    "https://lmtechnology.io,"
    "https://www.lmtechnology.io,"
    "http://localhost:5173,"
    "http://127.0.0.1:5173"
)
ALLOWED_ORIGINS = {
    origin.strip()
    for origin in os.environ.get("CORS_ALLOWED_ORIGINS", DEFAULT_ALLOWED_ORIGINS).split(",")
    if origin.strip()
}


app = Flask(__name__, static_folder=None)


@app.after_request
def add_cors_headers(response):
    origin = request.headers.get("Origin")
    if origin in ALLOWED_ORIGINS:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Vary"] = "Origin"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response


COPY = {
    "es": {
        "contact_lead_subject": "Nuevo lead para agendar llamada",
        "contact_subject": "Recibimos tu solicitud para agendar una llamada",
        "contact_message": "Gracias por contactarnos. Nuestro equipo revisara tu solicitud y te respondera pronto para coordinar la llamada.",
        "notify_lead_subject": "Nuevo interesado en contenido gratuito",
        "notify_subject": "Te avisaremos cuando el contenido gratuito este disponible",
        "notify_message": "Gracias por tu interes. Te enviaremos una notificacion a este correo cuando lancemos el contenido gratuito de LM Technology.",
    },
    "en": {
        "contact_lead_subject": "New lead to book a call",
        "contact_subject": "We received your request to book a call",
        "contact_message": "Thanks for contacting us. Our team will review your request and reply soon to coordinate the call.",
        "notify_lead_subject": "New free content notification signup",
        "notify_subject": "We will notify you when the free content is available",
        "notify_message": "Thanks for your interest. We will send a notification to this email when LM Technology launches the free content.",
    },
}


def get_copy(lang):
    return COPY.get(lang, COPY["es"])


def init_db():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("""
            create table if not exists contact_leads (
                id integer primary key autoincrement,
                created_at text not null default (datetime('now')),
                name text not null,
                company text not null,
                email text not null,
                phone text,
                service text,
                company_size text,
                message text not null,
                lang text not null default 'es',
                lead_source text not null default 'contact-form',
                ip_address text,
                user_agent text,
                status text not null default 'new'
            )
        """)
        conn.execute("""
            create table if not exists notification_leads (
                id integer primary key autoincrement,
                created_at text not null default (datetime('now')),
                email text not null,
                lang text not null default 'es',
                source text not null,
                ip_address text,
                user_agent text,
                status text not null default 'new'
            )
        """)
        ensure_column(conn, "contact_leads", "lead_source", "text not null default 'contact-form'")
        ensure_column(conn, "contact_leads", "ip_address", "text")
        ensure_column(conn, "contact_leads", "user_agent", "text")
        ensure_column(conn, "notification_leads", "ip_address", "text")
        ensure_column(conn, "notification_leads", "user_agent", "text")
        conn.execute("""
            create index if not exists contact_leads_created_at_idx
            on contact_leads (created_at desc)
        """)
        conn.execute("""
            create index if not exists notification_leads_created_at_idx
            on notification_leads (created_at desc)
        """)


def ensure_column(conn, table, column, definition):
    columns = {row[1] for row in conn.execute(f"pragma table_info({table})")}
    if column not in columns:
        conn.execute(f"alter table {table} add column {column} {definition}")


def is_email(value):
    return bool(re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", str(value or "").strip()))


def require_smtp():
    if not SMTP_PASS:
        raise RuntimeError("SMTP_PASS is not configured.")


def get_request_meta():
    forwarded_for = request.headers.get("X-Forwarded-For", "")
    ip_address = forwarded_for.split(",", 1)[0].strip() or request.remote_addr
    return {
        "ip_address": ip_address,
        "user_agent": request.headers.get("User-Agent"),
    }


def insert_contact_lead(form, lang, meta):
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.execute(
            """
            insert into contact_leads (
                name,
                company,
                email,
                phone,
                service,
                company_size,
                message,
                lang,
                lead_source,
                ip_address,
                user_agent
            ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                form["name"],
                form["company"],
                form["email"],
                form.get("phone") or None,
                form.get("service") or None,
                form.get("size") or None,
                form["message"],
                lang,
                "contact-form",
                meta.get("ip_address"),
                meta.get("user_agent"),
            ),
        )
        return cursor.lastrowid


def insert_notification_lead(email, lang, source, meta):
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.execute(
            """
            insert into notification_leads (
                email,
                lang,
                source,
                ip_address,
                user_agent
            ) values (?, ?, ?, ?, ?)
            """,
            (email, lang, source, meta.get("ip_address"), meta.get("user_agent")),
        )
        return cursor.lastrowid


def detail_row(label, value):
    if not value:
        return ""
    return f"<p><strong>{html.escape(label)}:</strong> {html.escape(str(value))}</p>"


def send_email(to_email, subject, text, html_body, reply_to=None):
    require_smtp()

    message = MIMEMultipart("alternative")
    message["From"] = f"LM Technology <{SMTP_USER}>"
    message["To"] = to_email
    message["Subject"] = subject
    message["Reply-To"] = reply_to or BUSINESS_EMAIL
    message.attach(MIMEText(text, "plain", "utf-8"))
    message.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as smtp:
        smtp.starttls()
        smtp.login(SMTP_USER, SMTP_PASS)
        smtp.send_message(message)


@app.post("/api/contact")
def contact():
    try:
        require_smtp()
    except RuntimeError as error:
        return jsonify({"message": str(error)}), 500

    payload = request.get_json(silent=True) or {}
    form = payload.get("form") or {}
    lang = payload.get("lang") or "es"
    texts = get_copy(lang)

    if not form.get("name") or not form.get("company") or not is_email(form.get("email")) or not form.get("message"):
        return jsonify({"message": "Missing required contact fields."}), 400

    meta = get_request_meta()
    lead_html = f"""
        <h2>Nuevo lead desde LM Technology</h2>
        {detail_row("Nombre", form.get("name"))}
        {detail_row("Empresa", form.get("company"))}
        {detail_row("Email", form.get("email"))}
        {detail_row("Telefono", form.get("phone"))}
        {detail_row("Servicio", form.get("service"))}
        {detail_row("Tamano de empresa", form.get("size"))}
        {detail_row("Mensaje", form.get("message"))}
        {detail_row("Idioma", lang)}
        {detail_row("Origen", "contact-form")}
    """
    user_html = f"""
        <h2>{html.escape(texts["contact_subject"])}</h2>
        <p>{html.escape(texts["contact_message"])}</p>
        <p>LM Technology</p>
    """

    try:
        lead_id = insert_contact_lead(form, lang, meta)
        send_email(
            BUSINESS_EMAIL,
            texts["contact_lead_subject"],
            (
                f"Nuevo lead #{lead_id}\n"
                f"Nombre: {form.get('name')}\n"
                f"Empresa: {form.get('company')}\n"
                f"Email: {form.get('email')}\n"
                f"Telefono: {form.get('phone') or '-'}\n"
                f"Servicio: {form.get('service') or '-'}\n"
                f"Tamano de empresa: {form.get('size') or '-'}\n"
                f"Idioma: {lang}\n\n"
                f"Mensaje:\n{form.get('message')}"
            ),
            lead_html,
            reply_to=form.get("email"),
        )
        send_email(
            form["email"],
            texts["contact_subject"],
            f"{texts['contact_subject']}\n\n{texts['contact_message']}\n\nLM Technology",
            user_html,
        )
        return jsonify({"ok": True, "leadId": lead_id})
    except Exception as error:
        app.logger.exception("Contact workflow failed: %s", error)
        return jsonify({"message": "Could not save contact lead or send email."}), 500


@app.post("/api/notify")
def notify():
    try:
        require_smtp()
    except RuntimeError as error:
        return jsonify({"message": str(error)}), 500

    payload = request.get_json(silent=True) or {}
    email = payload.get("email")
    lang = payload.get("lang") or "es"
    source = payload.get("source") or "free-content"
    texts = get_copy(lang)

    if not is_email(email):
        return jsonify({"message": "Invalid email."}), 400

    meta = get_request_meta()
    source_label = "videos gratuitos" if source == "free-videos" else "clases gratuitas"
    lead_html = f"""
        <h2>Nuevo interesado</h2>
        <p><strong>Email:</strong> {html.escape(email)}</p>
        <p><strong>Origen:</strong> {html.escape(source_label)}</p>
        <p><strong>Idioma:</strong> {html.escape(lang)}</p>
    """
    user_html = f"""
        <h2>{html.escape(texts["notify_subject"])}</h2>
        <p>{html.escape(texts["notify_message"])}</p>
        <p>LM Technology</p>
    """

    try:
        lead_id = insert_notification_lead(email, lang, source, meta)
        send_email(
            BUSINESS_EMAIL,
            texts["notify_lead_subject"],
            f"Nuevo interesado #{lead_id}\nEmail: {email}\nOrigen: {source_label}\nIdioma: {lang}",
            lead_html,
            reply_to=email,
        )
        send_email(
            email,
            texts["notify_subject"],
            f"{texts['notify_subject']}\n\n{texts['notify_message']}\n\nLM Technology",
            user_html,
        )
        return jsonify({"ok": True, "leadId": lead_id})
    except Exception as error:
        app.logger.exception("Notification workflow failed: %s", error)
        return jsonify({"message": "Could not save notification lead or send email."}), 500


@app.get("/api/health")
def health():
    return jsonify({"ok": True})


@app.get("/")
def index():
    if (DIST_DIR / "index.html").exists():
        return send_from_directory(DIST_DIR, "index.html")
    return jsonify({"ok": True, "message": "Backend running. Build the frontend with npm run build."})


@app.get("/<path:path>")
def static_files(path):
    target = DIST_DIR / path
    if target.exists() and target.is_file():
        return send_from_directory(DIST_DIR, path)
    if (DIST_DIR / "index.html").exists():
        return send_from_directory(DIST_DIR, "index.html")
    return jsonify({"message": "Not found."}), 404


init_db()


if __name__ == "__main__":
    app.run(host=HOST, port=PORT)
