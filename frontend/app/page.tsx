import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Skills from "./components/Skills";
import Certificates from "./components/Certificates";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Portfolio />
      <Skills />
      <Certificates />
      <Testimonials />
      <Contact />
    </>
  );
}
