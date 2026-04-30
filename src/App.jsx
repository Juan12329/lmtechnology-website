import { useState } from 'react';
import { t } from './translations';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Why from './components/Why';
import TrustedBy from './components/TrustedBy';
import Process from './components/Process';
import Solutions from './components/Solutions';
import FreeClasses from './components/FreeClasses';
import FreeVideos from './components/FreeVideos';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [lang, setLang] = useState('es');
  const tx = t[lang];

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />
      <main>
        <Hero tx={tx.hero} />
        <Services tx={tx.services} />
        <Why tx={tx.why} />
        <TrustedBy tx={tx.trusted} />
        <Process tx={tx.process} />
        <Solutions tx={tx.solutions} lang={lang} />
        <FreeClasses tx={tx.freeClasses} lang={lang} />
        <FreeVideos tx={tx.freeVideos} lang={lang} />
        <FAQ tx={tx.faq} />
        <Contact tx={tx.contact} lang={lang} />
      </main>
      <Footer tx={tx.footer} />
    </>
  );
}

export default App;
