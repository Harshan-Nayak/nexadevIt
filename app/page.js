import Image from "next/image";
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import PortfolioSection from './components/PortfolioSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <section id="home">
        <HeroSection />
      </section>
      <section id="services">
        <ServicesSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="portfolio">
        <PortfolioSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
      <Footer />
    </main>
  );
}
