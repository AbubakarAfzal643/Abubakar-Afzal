import "./styles/global.css";
import "./styles/sections.css";

import { useMouseGlow } from "./hooks/useMouseGlow";

import Cursor       from "./components/Navbar/Cursor";
import BackToTop    from "./components/Navbar/BackToTop";
import Navbar       from "./components/Navbar/Navbar";
import Hero         from "./components/Hero/Hero";
import About        from "./components/About/About";
import Education    from "./components/Education/Education";
import Experience   from "./components/Experience/Experience";
import Projects     from "./components/Projects/Projects";
import Skills       from "./components/Skills/Skills";
import Certificates from "./components/Certificates/Certificates";
import Contact      from "./components/Contact/Contact";
import Footer       from "./components/Footer/Footer";

export default function App() {
  useMouseGlow();

  return (
    <>
      <Cursor />
      <BackToTop />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
