import * as THREE from "three/webgpu";

import { EventEmitter } from "events";
import { Experience } from "./Experience";

import gsap from "gsap";

export class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = Experience.getInstance();
    this.resources = this.experience.resources;

    this.preloaders = document.querySelectorAll(".preloader");
    this.progressBars = document.querySelectorAll(".preloader__progress-bar");

    this.resources.on("progress", (value) => {
      this.onLoad(value);
    });

    this.resources.on("ready", () => {
      this.playOutro();
    });
  }

  onLoad(value) {
    this.progressBars.forEach((bar) => {
      bar.style.width = `${Math.round(value * 100)}%`;
    });
  }

  playOutro() {
    gsap.to([...this.preloaders], {
      opacity: 0,
      duration: 0.5,
      delay: 1,
      overwrite: true,
      onComplete: () => {
        this.preloaders.forEach((p) => p.remove());
      },
    });
  }
}
