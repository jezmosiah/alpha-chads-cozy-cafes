import * as THREE from "three/webgpu";
import { Experience } from "../Experience";

export class Environment {
  constructor() {
    this.experience = Experience.getInstance();

    this.init();
  }

  init() {}

  resize() {}

  update() {}
}
