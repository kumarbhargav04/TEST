"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Contact.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.reveal}`, {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className={styles.contact}>
      <span className={`${styles.eyebrow} ${styles.reveal}`}>Get in touch</span>
      <h2 className={`${styles.heading} ${styles.reveal}`}>
        Let&rsquo;s build something.
      </h2>

      <div className={`${styles.linkRow} ${styles.reveal}`}>
        <a href="mailto:vasakumarbhargav2@gmail.com" className={styles.link}>
          vasakumarbhargav2@gmail.com
        </a>
        <a href="tel:+916281704012" className={styles.link}>
          +91 62817 04012
        </a>
        <a
          href="https://github.com/kumarbhargav04"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          github.com/kumarbhargav04
        </a>
        <a
          href="https://linkedin.com/in/kumar-bhargav-vasa"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          linkedin.com/in/kumar-bhargav-vasa
        </a>
      </div>

      <p className={`${styles.footerNote} ${styles.reveal}`}>
        &copy; {new Date().getFullYear()} Kumar Bhargav Vasa.
      </p>
    </section>
  );
}
