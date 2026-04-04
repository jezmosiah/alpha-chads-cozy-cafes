import { EventEmitter } from "events";

export class Time extends EventEmitter {
  constructor() {
    super();
    this.elapsed = 0;
    this.delta = 0;
    this.previousTime = performance.now() * 0.001;
    this._lastClockUpdate = 0;
    this.updateClocks();
    this.update();
  }

  updateClocks() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const timeString = `${hours}:${minutes} ${ampm}`;

    document.querySelectorAll(".corner-info__clock").forEach((el) => {
      el.textContent = timeString;
    });
  }

  update() {
    const currentTime = performance.now() * 0.001;
    this.delta = currentTime - this.previousTime;
    this.previousTime = currentTime;
    this.elapsed = currentTime;

    if (currentTime - this._lastClockUpdate >= 1) {
      this._lastClockUpdate = currentTime;
      this.updateClocks();
    }

    this.emit("update");
    window.requestAnimationFrame(() => this.update());
  }
}
