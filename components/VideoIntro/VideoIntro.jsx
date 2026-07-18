"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import CinematicLayer from "../CinematicLayer/CinematicLayer";
import styles from "./VideoIntro.module.css";

export default function VideoIntro({ nextSectionId = "work" }) {
  const rootRef = useRef(null);
  const bgVideoRef = useRef(null);
  const fgVideoRef = useRef(null);
  const taglineRef = useRef(null);
  const nameLine1Ref = useRef(null);
  const nameLine2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const controlsRef = useRef(null);
  const soundHintRef = useRef(null);
  const scrollRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // --- Entrance animation ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.set(rootRef.current, { opacity: 0 })
        .to(rootRef.current, { opacity: 1, duration: 1.2, ease: "power2.out" })
        .from(
          taglineRef.current,
          { y: 24, opacity: 0, duration: 0.9, letterSpacing: "0.5em" },
          "-=0.6"
        )
        .from(
          nameLine1Ref.current,
          { y: "100%", opacity: 0, duration: 1.1, ease: "power4.out" },
          "-=0.5"
        )
        .from(
          nameLine2Ref.current,
          { y: "100%", opacity: 0, duration: 1.1, ease: "power4.out" },
          "-=0.85"
        )
        .from(subtitleRef.current, { y: 16, opacity: 0, duration: 0.9 }, "-=0.5")
        .from(
          controlsRef.current,
          { y: 12, opacity: 0, duration: 0.7 },
          "-=0.4"
        )
        .from(
          scrollRef.current,
          { y: 12, opacity: 0, duration: 0.7 },
          "-=0.5"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // --- Auto-hide the "tap for sound" hint ---
  useEffect(() => {
    const hint = soundHintRef.current;
    if (!hint) return;
    const timer = setTimeout(() => {
      gsap.to(hint, { opacity: 0, y: 8, duration: 0.6, ease: "power2.out" });
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  function togglePlay() {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;
    if (isPlaying) {
      fg.pause();
      bg.pause();
    } else {
      fg.play();
      bg.play();
    }
    setIsPlaying(!isPlaying);
  }

  function toggleMute() {
    const fg = fgVideoRef.current;
    if (!fg) return;
    fg.muted = !fg.muted;
    setIsMuted(fg.muted);
    if (soundHintRef.current) {
      gsap.to(soundHintRef.current, { opacity: 0, duration: 0.4 });
    }
  }

  function scrollToNext() {
    const el = document.getElementById(nextSectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section ref={rootRef} className={styles.hero}>
      {/* Ambient blurred background layer */}
      <div className={styles.bgVideoWrap}>
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          src="/videos/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Foreground focal video */}
      <div className={styles.fgVideoWrap}>
        <video
          ref={fgVideoRef}
          className={styles.fgVideo}
          src="/videos/hero.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />
      </div>

      {/* Cinematic gradient overlays for readability */}
      <div className={styles.gradientOverlay} />
      <div className={styles.vignette} />

      {/* Three.js floating bokeh particle layer */}
      <CinematicLayer />

      {/* Landing content */}
      <div className={styles.content}>
        <span ref={taglineRef} className={styles.tagline}>
          Python &mdash; AI &amp; Data Science
        </span>

        <h1 className={styles.name}>
          <span className={styles.lineMask}>
            <span ref={nameLine1Ref} className={styles.nameLine}>
              KUMAR
            </span>
          </span>
          <span className={styles.lineMask}>
            <span ref={nameLine2Ref} className={styles.nameLine}>
              BHARGAV
            </span>
          </span>
        </h1>

        <p ref={subtitleRef} className={styles.subtitle}>
          Final-year Computer Science (AI/ML) engineer crafting full-stack
          products with Python, Django and Flask &mdash; grounded in data
          structures, algorithms and a problem-solver&rsquo;s instinct.
        </p>
      </div>

      {/* Sound hint badge */}
      <div ref={soundHintRef} className={styles.soundHint}>
        <span className={styles.soundHintDot} />
        Tap for sound
      </div>

      {/* Glassmorphism playback controls */}
      <div ref={controlsRef} className={styles.controls}>
        <button
          className={styles.controlButton}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          className={styles.controlButton}
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <MutedIcon /> : <UnmutedIcon />}
        </button>
      </div>

      {/* Scroll indicator */}
      <button
        ref={scrollRef}
        className={styles.scrollIndicator}
        onClick={scrollToNext}
        aria-label="Scroll to next section"
      >
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollLine}>
          <span className={styles.scrollPulse} />
        </span>
      </button>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 2.5L13.5 8L4 13.5V2.5Z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="3.5" y="2.5" width="3" height="11" fill="currentColor" />
      <rect x="9.5" y="2.5" width="3" height="11" fill="currentColor" />
    </svg>
  );
}

function UnmutedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M2 6.5H5L9 3V15L5 11.5H2V6.5Z"
        fill="currentColor"
      />
      <path
        d="M12 6C13 7 13 11 12 12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M13.6 4.2C15.6 6.5 15.6 11.5 13.6 13.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 6.5H5L9 3V15L5 11.5H2V6.5Z" fill="currentColor" />
      <path
        d="M12.5 6.5L16 10M16 6.5L12.5 10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
