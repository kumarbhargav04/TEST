"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Skills.module.css";

gsap.registerPlugin(ScrollTrigger);

import {
  FaPython,
  FaJava,
  FaDatabase,
  FaHtml5,
  FaCss3Alt,
  FaCode,
  FaCubes,
  FaServer,
  FaWindows,
  FaGitAlt,
  FaGithub,
  FaJs
} from "react-icons/fa";
import {
  SiDjango,
  SiFlask,
  SiMysql,
  SiFirebase
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const SKILL_GROUPS = [
  {
    label: "Languages",
    items: [
      { name: "Python", icon: FaPython },
      { name: "Java", icon: FaJava },
      { name: "SQL", icon: FaDatabase },
    ],
  },
  {
    label: "Web Technologies",
    items: [
      { name: "HTML", icon: FaHtml5 },
      { name: "CSS", icon: FaCss3Alt },
      { name: "JavaScript", icon: FaJs },
    ],
  },
  {
    label: "Frameworks",
    items: [
      { name: "Django", icon: SiDjango },
      { name: "Flask", icon: SiFlask },
    ],
  },
  {
    label: "Database",
    items: [
      { name: "MySQL", icon: SiMysql },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    label: "Core CS",
    items: [
      { name: "Data Structures & Algorithms", icon: FaCode },
      { name: "OOP", icon: FaCubes },
      { name: "DBMS", icon: FaServer },
      { name: "Operating Systems", icon: FaWindows },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git", icon: FaGitAlt },
      { name: "GitHub", icon: FaGithub },
      { name: "VS Code", icon: VscVscode },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.card}`, {
        y: 28,
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
    <section id="skills" ref={sectionRef} className={styles.skills}>
      <span className={styles.eyebrow}>Technical Skills</span>
      <h2 className={styles.heading}>Tools of the trade.</h2>

      <div className={styles.gridWrap}>
        {SKILL_GROUPS.map((group) => (
          <div className={styles.card} key={group.label}>
            <h3 className={styles.cardTitle}>{group.label}</h3>
            <ul className={styles.tagList}>
              {group.items.map((item) => (
                <li className={styles.tag} key={item.name}>
                  <item.icon className={styles.tagIcon} />
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
