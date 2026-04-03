import * as THREE from "three/webgpu";
import { Experience } from "./Experience";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export class Camera {
  constructor() {
    this.experience = Experience.getInstance();

    this.init();
    // this.setOrbitControls();
  }

  init() {
    this.instance = new THREE.PerspectiveCamera(
      38,
      this.experience.sizes.aspect,
      0.1,
      1000,
    );
    // this.instance = new THREE.OrthographicCamera(
    //   (-this.experience.sizes.aspect * 5) / 2,
    //   (this.experience.sizes.aspect * 5) / 2,
    //   5 / 2,
    //   -5 / 2,
    //   -50,
    //   50,
    // );

    this.cameraRig = new THREE.Group();
    this.cameraRig.position.set(
      14.34083105685984,
      1.901879757652369,
      1.2686006038571627,
    );
    this.instance.position.set(0, 0, 0);
    this.cameraRig.rotation.y = Math.PI / 2;

    this.cameraRig.add(this.instance);
    this.experience.scene.add(this.cameraRig);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(
      this.instance,
      this.experience.canvasElement,
    );
    this.controls.enableDamping = true;

    this.controls.target.set(
      0.4051429723729012,
      1.3590488890595496,
      1.0787116613594163,
    );
  }

  resize() {
    this.instance.aspect = this.experience.sizes.aspect;
    this.instance.updateProjectionMatrix();
  }

  update() {
    // console.log(this.instance.position);
    // console.log(this.controls.target);
    if (this.controls) {
      this.controls.update();
    }
  }
}
