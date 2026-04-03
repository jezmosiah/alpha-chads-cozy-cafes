import * as THREE from "three/webgpu";

import { EventEmitter } from "events";

export class Time extends EventEmitter {
  constructor() {
    super();
    this.update();
  }

  update() {
    this.emit("update");
    window.requestAnimationFrame(() => this.update());
  }
}
