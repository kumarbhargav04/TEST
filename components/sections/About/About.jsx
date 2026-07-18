"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.reveal}`, {
        y: 32,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div className={styles.grid}>
        <div className={`${styles.eyebrowCol} ${styles.reveal}`}>
          <span className={styles.eyebrow}>About</span>
        </div>

        <div className={styles.copyCol}>
          <p className={`${styles.lead} ${styles.reveal}`}>
            An explorer and enthusiast of learning new things &mdash; a
            problem solver with a consistent educational graph, currently
            finishing a B.Tech in Computer Science (AI/ML) and preparing for
            a career as a software engineer.
          </p>

          <div className={`${styles.internshipCard} ${styles.reveal}`}>
            <span className={styles.internshipTag}>Internship</span>
            <h3 className={styles.internshipTitle}>
              App Genesis Soft Solutions Pvt. Ltd.
            </h3>
            <p className={styles.internshipCopy}>
              Short-term virtual internship on Python Django &mdash;
              practical experience building web applications, implementing
              CRUD operations, database integration, and the MVT
              architecture for backend development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
