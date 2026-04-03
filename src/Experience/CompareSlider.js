import { Experience } from "./Experience";

export class CompareSlider {
  constructor() {
    this.experience = Experience.getInstance();
    this.element = document.getElementById("compare-slider");
    this.isDragging = false;

    document.documentElement.style.setProperty("--slider-x", "50%");

    this.init();
  }

  init() {
    this.element.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.experience.isDraggingSlider = true;
    });

    window.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;
      this.updateSlider(e.clientX);
    });

    window.addEventListener("mouseup", () => {
      this.isDragging = false;
      this.experience.isDraggingSlider = false;
    });

    this.element.addEventListener(
      "touchstart",
      (e) => {
        e.stopPropagation();
        this.isDragging = true;
        this.experience.isDraggingSlider = true;
      },
      { passive: true },
    );

    window.addEventListener(
      "touchmove",
      (e) => {
        if (!this.isDragging) return;
        e.stopPropagation();
        this.updateSlider(e.touches[0].clientX);
      },
      { passive: true },
    );

    window.addEventListener("touchend", () => {
      this.isDragging = false;
      this.experience.isDraggingSlider = false;
    });

    window.addEventListener("touchcancel", () => {
      this.isDragging = false;
      this.experience.isDraggingSlider = false;
    });
  }

  updateSlider(clientX) {
    const normalized = clientX / this.experience.sizes.width;
    const clamped = Math.max(0.0, Math.min(1, normalized));

    this.element.style.left = `${clamped * 100}%`;
    this.experience.renderer.sliderX.value = clamped;

    document.documentElement.style.setProperty(
      "--slider-x",
      `${clamped * 100}%`,
    );
  }
}
