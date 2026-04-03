import * as THREE from "three/webgpu";
import { Experience } from "./Experience";

export class Renderer {
  constructor() {
    this.experience = Experience.getInstance();

    this.init();
  }

  async init() {
    this.renderer = new THREE.WebGPURenderer({
      canvas: this.experience.canvasElement,
      antialias: true,
    });

    await this.renderer.init();
    this.renderer.toneMapping = THREE.CineonToneMapping;
    this.renderer.toneMappingExposure = 1.5;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(
      this.experience.sizes.width,
      this.experience.sizes.height,
    );
    this.renderer.setPixelRatio(this.experience.sizes.pixelRatio);
  }

  resize() {
    this.renderer.setSize(
      this.experience.sizes.width,
      this.experience.sizes.height,
    );
    this.renderer.setPixelRatio(this.experience.sizes.pixelRatio);
  }

  update() {
    this.renderer.render(
      this.experience.scene,
      this.experience.camera.instance,
    );
  }
}
