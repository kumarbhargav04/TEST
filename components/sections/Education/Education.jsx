"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Education.module.css";

gsap.registerPlugin(ScrollTrigger);

const EDUCATION = [
  {
    period: "2024 – 2027",
    degree: "B.Tech — Computer Science & Engineering (AI/ML)",
    school: "Sri Vasavi Institute of Engineering and Technology",
    score: "CGPA 8.45",
  },
  {
    period: "2021 – 2024",
    degree: "Diploma — AI/ML",
    school: "Sri Jyothi Polytechnic College",
    score: "CGPA 8.2",
  },
  {
    period: "2020 – 2021",
    degree: "SSC",
    school: "Abhirami High School",
    score: "CGPA 10",
  },
];

export default function Education() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.row}`, {
        x: -24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className={styles.education}>
      <span className={styles.eyebrow}>Education</span>
      <h2 className={styles.heading}>A steady academic climb.</h2>

      <div className={styles.timeline}>
        {EDUCATION.map((item) => (
          <div className={styles.row} key={item.degree}>
            <span className={styles.period}>{item.period}</span>
            <div className={styles.details}>
              <h3 className={styles.degree}>{item.degree}</h3>
              <p className={styles.school}>{item.school}</p>
            </div>
            <span className={styles.score}>{item.score}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
