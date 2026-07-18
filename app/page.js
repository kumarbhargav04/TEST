import VideoIntro from "../components/VideoIntro/VideoIntro";
import About from "../components/sections/About/About";
import Education from "../components/sections/Education/Education";
import Skills from "../components/sections/Skills/Skills";
import Projects from "../components/sections/Projects/Projects";
import Certifications from "../components/sections/Certifications/Certifications";
import Contact from "../components/sections/Contact/Contact";

export default function Home() {
  return (
    <main>
      <VideoIntro nextSectionId="about" />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
    </main>
  );
}
