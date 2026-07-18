"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const nameRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Re-enable scrolling after animation finishes
          document.body.style.overflow = "";
        },
      });

      tl.to(
        {},
        {
          duration: 1.8,
          onUpdate: function () {
            setProgress(Math.round(this.progress() * 100));
          },
          ease: "power2.inOut",
        }
      )
        .to(
          counterRef.current,
          {
            y: -30,
            opacity: 0,
            duration: 0.5,
            ease: "power3.in",
          },
          "+=0.3"
        )
        .to(
          nameRef.current,
          {
            y: -20,
            opacity: 0,
            duration: 0.5,
            ease: "power3.in",
          },
          "-=0.3"
        )
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        });
    }, containerRef);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, []);

  return (
    <div className={styles.preloader} ref={containerRef}>
      <div className={styles.counter} ref={counterRef}>
        {progress}%
      </div>
      <div className={styles.name} ref={nameRef}>
        Kumar Bhargav Vasa
      </div>
    </div>
  );
}
