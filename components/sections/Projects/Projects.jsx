"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Projects.module.css";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    index: "01",
    title: "Nexus — AI Chatbot",
    stack: "Flask · Gemini API",
    copy: "Full-stack AI chatbot with dynamic model selection and REST endpoints (/chat, /clear, /history). Responsive chat UI with session-based conversation history.",
  },
  {
    index: "02",
    title: "Attendance Management System",
    stack: "Django · Firebase",
    copy: "Full-stack web app with Admin & Student login, role-based access control, real-time Firebase storage, and an attendance dashboard.",
  },
  {
    index: "03",
    title: "PlagScan — Plagiarism Detector",
    stack: "Flask · NLP",
    copy: "TF-IDF and cosine-similarity based plagiarism detection, with a lightweight single-file HTML frontend and no external dependencies.",
  },
  {
    index: "04",
    title: "Enterprise Movie & Hotel Booking System",
    stack: "Python · OOP",
    copy: "CLI booking system for movies and hotels — reservations, payments, ratings, cancellations, and analytics, built on OOP principles.",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.card}`, {
        y: 40,
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
    <section id="work" ref={sectionRef} className={styles.projects}>
      <span className={styles.eyebrow}>Selected Work</span>
      <h2 className={styles.heading}>Full-stack projects, built end to end.</h2>

      <div className={styles.gridWrap}>
        {PROJECTS.map((project) => (
          <article className={styles.card} key={project.title}>
            <span className={styles.index}>{project.index}</span>
            <h3 className={styles.title}>{project.title}</h3>
            <span className={styles.stack}>{project.stack}</span>
            <p className={styles.copy}>{project.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
