"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./CinematicLayer.module.css";

const PARTICLE_COUNT = 140;

export default function CinematicLayer() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // --- Scene setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 2000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    mount.appendChild(renderer.domElement);

    // --- Soft round bokeh sprite, drawn once onto a canvas texture ---
    const spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = 128;
    spriteCanvas.height = 128;
    const ctx = spriteCanvas.getContext("2d");
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.35, "rgba(255,200,150,0.6)");
    gradient.addColorStop(1, "rgba(255,150,80,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    const spriteTexture = new THREE.CanvasTexture(spriteCanvas);

    // --- Particle geometry ---
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);
    const colorMix = new Float32Array(PARTICLE_COUNT); // 0 = orange, 1 = white
    const baseSizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 900;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 500;
      speeds[i] = 0.15 + Math.random() * 0.35;
      phases[i] = Math.random() * Math.PI * 2;
      colorMix[i] = Math.random();
      baseSizes[i] = 4 + Math.random() * 10;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const warm = new THREE.Color("#ff8a4d");
    const white = new THREE.Color("#fff3e6");
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const c = warm.clone().lerp(white, colorMix[i]);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const sizes = new Float32Array(baseSizes);
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 8,
      map: spriteTexture,
      transparent: true,
      opacity: 0.55,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- Mouse parallax state ---
    const mouse = { x: 0, y: 0 };
    const targetCamera = { x: 0, y: 0 };

    function handlePointerMove(e) {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // --- Resize handling ---
    function handleResize() {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener("resize", handleResize);

    // --- Animation loop ---
    let rafId;
    const clock = new THREE.Clock();

    function animate() {
      const elapsed = clock.getElapsedTime();
      const posAttr = geometry.getAttribute("position");

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        posAttr.array[idx + 1] +=
          Math.sin(elapsed * speeds[i] + phases[i]) * 0.04;
        posAttr.array[idx] += Math.cos(elapsed * speeds[i] * 0.6 + phases[i]) * 0.03;
      }
      posAttr.needsUpdate = true;

      targetCamera.x += (mouse.x * 30 - targetCamera.x) * 0.02;
      targetCamera.y += (-mouse.y * 20 - targetCamera.y) * 0.02;
      camera.position.x = targetCamera.x;
      camera.position.y = targetCamera.y;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }
    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      spriteTexture.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={styles.canvasLayer} aria-hidden="true" />;
}
