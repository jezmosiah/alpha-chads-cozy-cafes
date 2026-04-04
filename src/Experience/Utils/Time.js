import { EventEmitter } from "events";

export class Time extends EventEmitter {
  constructor() {
    super();
    this.elapsed = 0;
    this.delta = 0;
    this.previousTime = performance.now() * 0.001;
    this.update();
  }

  update() {
    const currentTime = performance.now() * 0.001;
    this.delta = currentTime - this.previousTime;
    this.previousTime = currentTime;
    this.elapsed = currentTime;
    this.emit("update");
    window.requestAnimationFrame(() => this.update());
  }
}
