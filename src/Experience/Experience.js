import * as THREE from "three/webgpu";
import { Time } from "./Utils/Time";
import { Sizes } from "./Utils/Sizes";
import { Camera } from "./Camera";
import { Renderer } from "./Renderer";
import { World } from "./World/World";
import { Resources } from "./Utils/Resources";
import { Controls } from "./Controls";
import { Mouse } from "./Mouse";
import { Raycaster } from "./Raycaster";
import { Device } from "./Utils/Device";
import { Preloader } from "./Preloader";

export class Experience {
  static getInstance() {
    return Experience.instance;
  }

  constructor() {
    if (Experience.instance) return Experience.instance;

    Experience.instance = this;

    this.init();
  }

  async init() {
    this.canvasElement = document.getElementById("experience-canvas");

    this.scene = new THREE.Scene();
    this.time = new Time();
    this.device = new Device();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.mouse = new Mouse();
    this.controls = new Controls();
    this.raycaster = new Raycaster();
    await this.renderer.init();

    this.resources = new Resources();
    this.preloader = new Preloader();
    this.world = new World();

    this.time.on("update", () => {
      this.update();
    });
    this.sizes.on("resize", () => {
      this.resize();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.world.update();
    this.renderer.update();
    this.camera.update();
    this.raycaster.update();
    this.controls.update();
  }
}
