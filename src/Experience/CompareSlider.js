import { Experience } from "./Experience";

import gsap from "gsap";

export class CompareSlider {
  constructor() {
    this.experience = Experience.getInstance();
    this.element = document.getElementById("compare-slider");
    this.isDragging = false;

    this.lastClientX = 0;
    this.signedVelocity = 0;

    document.documentElement.style.setProperty("--slider-x", "50%");

    this.init();
  }

  init() {
    this.element.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.lastClientX = e.clientX / this.experience.sizes.width;
      this.experience.isDraggingSlider = true;
      this.animateAmplitude(0.02);
    });

    this.element.addEventListener(
      "touchstart",
      (e) => {
        e.stopPropagation();
        this.isDragging = true;
        this.lastClientX = e.touches[0].clientX / this.experience.sizes.width;
        this.experience.isDraggingSlider = true;
        this.animateAmplitude(0.02);
      },
      { passive: true },
    );

    window.addEventListener("mouseup", () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.experience.isDraggingSlider = false;
      this.animateAmplitude(0);
    });

    window.addEventListener("touchend", () => {
      this.isDragging = false;
      this.experience.isDraggingSlider = false;
      this.animateAmplitude(0);
    });

    window.addEventListener("touchcancel", () => {
      this.isDragging = false;
      this.experience.isDraggingSlider = false;
      this.animateAmplitude(0);
    });

    window.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;
      this.updateSlider(e.clientX);
    });

    window.addEventListener(
      "touchmove",
      (e) => {
        if (!this.isDragging) return;
        e.stopPropagation();
        this.updateSlider(e.touches[0].clientX);
      },
      { passive: true },
    );

    window.addEventListener("mouseup", () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.experience.isDraggingSlider = false;
      if (this.fluctuateInterval) clearInterval(this.fluctuateInterval);
      this.animateAmplitude(0);
    });

    window.addEventListener("touchend", () => {
      this.isDragging = false;
      this.experience.isDraggingSlider = false;
      if (this.fluctuateInterval) clearInterval(this.fluctuateInterval);
      this.animateAmplitude(0);
    });

    window.addEventListener("touchcancel", () => {
      this.isDragging = false;
      this.experience.isDraggingSlider = false;
      if (this.fluctuateInterval) clearInterval(this.fluctuateInterval);
      this.animateAmplitude(0);
    });
  }

  animateAmplitude(target) {
    gsap.killTweensOf(this.proxy);
    this.proxy = { value: this.experience.renderer.amplitude.value };

    if (target === 0) {
      gsap.to(this.proxy, {
        value: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)",
        onUpdate: () => {
          this.experience.renderer.amplitude.value = this.proxy.value;
        },
      });
    } else {
      gsap.to(this.proxy, {
        value: target,
        duration: 0.15,
        ease: "power2.out",
        onUpdate: () => {
          this.experience.renderer.amplitude.value = this.proxy.value;
        },
      });
    }
  }
  updateSlider(clientX) {
    const normalized = clientX / this.experience.sizes.width;
    const clamped = Math.max(0.0, Math.min(1, normalized));

    this.signedVelocity = normalized - this.lastClientX;
    this.lastClientX = normalized;

    this.element.style.left = `${clamped * 100}%`;
    this.experience.renderer.sliderX.value = clamped;

    document.documentElement.style.setProperty(
      "--slider-x",
      `${clamped * 100}%`,
    );
  }
}
