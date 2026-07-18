"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Certifications.module.css";

gsap.registerPlugin(ScrollTrigger);

const CERTIFICATIONS = [
  "NPTEL — Human Computer Interaction (Elite)",
  "Data Analytics Job Simulation — Deloitte (Forage)",
  "Data Visualization — Tata (Forage)",
  "Data Science Master Virtual Internship — EduSkills (Altair)",
  "AI Training & Data Science — Corizo",
];

const ACHIEVEMENTS = [
  "Participated in technical exhibitions and ideathons.",
  "Technical Committee Member — helped plan and run workshops, coding contests, and project exhibitions.",
];

export default function Certifications() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.reveal}`, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className={styles.certifications}
    >
      <div className={styles.grid}>
        <div>
          <span className={`${styles.eyebrow} ${styles.reveal}`}>
            Certifications
          </span>
          <ul className={styles.list}>
            {CERTIFICATIONS.map((item) => (
              <li className={`${styles.listItem} ${styles.reveal}`} key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className={`${styles.eyebrow} ${styles.reveal}`}>
            Achievements
          </span>
          <ul className={styles.list}>
            {ACHIEVEMENTS.map((item) => (
              <li className={`${styles.listItem} ${styles.reveal}`} key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
