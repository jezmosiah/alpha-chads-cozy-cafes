import { EventEmitter } from "events";

export class Time extends EventEmitter {
  constructor() {
    super();
    this.elapsed = 0;
    this.update();
  }

  update() {
    this.elapsed = performance.now() * 0.001;
    this.emit("update");
    window.requestAnimationFrame(() => this.update());
  }
}
