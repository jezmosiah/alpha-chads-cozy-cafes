import * as THREE from "three/webgpu";
import GUI from "lil-gui";
import { Experience } from "../Experience";

export class CapybaraCafe {
  constructor() {
    this.experience = Experience.getInstance();
    this.capybaracafe = this.experience.resources.items.capybaracafe.scene;
    this.init();
  }

  init() {
    this.initCafe();
    // this.initPlane();
    this.initBgOrb();
    this.initEnvironment();
    // this.initDebug();
  }

  initCafe() {
    this.capybaracafe.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    this.experience.scene.add(this.capybaracafe);
  }

  initEnvironment() {
    this.ambientLight = new THREE.AmbientLight("#fff2f2", 2);
    this.experience.scene.add(this.ambientLight);

    this.sunLight = new THREE.DirectionalLight("#ffffff", 2.2);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(4096, 4096);
    this.sunLight.shadow.normalBias = 0.2;
    this.sunLight.shadow.camera.left = -100;
    this.sunLight.shadow.camera.right = 300;
    this.sunLight.shadow.camera.top = 100;
    this.sunLight.shadow.camera.bottom = -50;
    this.sunLight.position.set(5, 18, -3);
    this.experience.scene.add(this.sunLight);
    this.experience.scene.add(this.sunLight.target);

    this.lightHelper = new THREE.DirectionalLightHelper(this.sunLight, 15);
    this.experience.scene.add(this.lightHelper);
  }

  initDebug() {
    this.gui = new GUI({ title: "Lighting" });

    const sunFolder = this.gui.addFolder("☀️ Sun Light");
    sunFolder.addColor(this.sunLight, "color").name("Color");
    sunFolder.add(this.sunLight, "intensity", 0, 10, 0.01).name("Intensity");
    sunFolder
      .add(this.sunLight.position, "x", -50, 50, 0.1)
      .name("Pos X")
      .onChange(() => this.lightHelper.update());
    sunFolder
      .add(this.sunLight.position, "y", -50, 50, 0.1)
      .name("Pos Y")
      .onChange(() => this.lightHelper.update());
    sunFolder
      .add(this.sunLight.position, "z", -50, 50, 0.1)
      .name("Pos Z")
      .onChange(() => this.lightHelper.update());
    sunFolder
      .add(this.sunLight.shadow, "normalBias", 0, 1, 0.001)
      .name("Shadow Bias");
    sunFolder
      .add(this.sunLight.target.position, "x", -50, 50, 0.1)
      .name("Target X")
      .onChange(() => {
        this.sunLight.target.updateMatrixWorld();
        this.lightHelper.update();
      });
    sunFolder
      .add(this.sunLight.target.position, "y", -50, 50, 0.1)
      .name("Target Y")
      .onChange(() => {
        this.sunLight.target.updateMatrixWorld();
        this.lightHelper.update();
      });
    sunFolder
      .add(this.sunLight.target.position, "z", -50, 50, 0.1)
      .name("Target Z")
      .onChange(() => {
        this.sunLight.target.updateMatrixWorld();
        this.lightHelper.update();
      });

    const ambientFolder = this.gui.addFolder("🌫️ Ambient Light");
    ambientFolder.addColor(this.ambientLight, "color").name("Color");
    ambientFolder
      .add(this.ambientLight, "intensity", 0, 10, 0.01)
      .name("Intensity");
  }

  initPlane() {
    const geometry = new THREE.PlaneGeometry(1000, 1000);
    const material = new THREE.MeshStandardMaterial({
      color: "#edbd76",
      side: THREE.FrontSide,
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.set(-Math.PI / 2, 0, 0);
    plane.receiveShadow = true;
    plane.castShadow = false;
    plane.position.set(0, 0.248, 0);
    this.experience.scene.add(plane);
  }

  initBgOrb() {
    const geometry = new THREE.SphereGeometry(500, 32, 16);
    const material = new THREE.MeshBasicMaterial({
      color: "#75a3e4",
      side: THREE.BackSide,
    });
    const sphere = new THREE.Mesh(geometry, material);
    this.experience.scene.add(sphere);
  }

  resize() {}

  update() {}

  destroy() {
    this.gui.destroy();
  }
}
