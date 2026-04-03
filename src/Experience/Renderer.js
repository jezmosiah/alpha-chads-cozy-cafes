import * as THREE from "three/webgpu";
import { texture, uniform, uv, select, lessThan, vec2 } from "three/tsl";
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

    this.initRenderTargets();
    this.initCompositor();
  }

  initRenderTargets() {
    const { width, height, pixelRatio } = this.experience.sizes;

    const params = {
      samples: 4,
    };

    this.renderTargetA = new THREE.RenderTarget(
      width * pixelRatio,
      height * pixelRatio,
      params,
    );

    this.renderTargetB = new THREE.RenderTarget(
      width * pixelRatio,
      height * pixelRatio,
      params,
    );
  }

  initCompositor() {
    this.orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);

    this.sliderX = uniform(0.5);

    const flippedUV = vec2(uv().x, uv().y.oneMinus());

    this.compositeMaterial = new THREE.NodeMaterial();
    this.compositeMaterial.fragmentNode = select(
      lessThan(uv().x, this.sliderX),
      texture(this.renderTargetA.texture, flippedUV),
      texture(this.renderTargetB.texture, flippedUV),
    );

    this.compositeQuad = new THREE.Mesh(geometry, this.compositeMaterial);
    this.compositeScene = new THREE.Scene();
    this.compositeScene.add(this.compositeQuad);
  }

  resize() {
    const { width, height, pixelRatio } = this.experience.sizes;

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(pixelRatio);

    this.renderTargetA.setSize(width * pixelRatio, height * pixelRatio);
    this.renderTargetB.setSize(width * pixelRatio, height * pixelRatio);
  }

  update() {
    const camera = this.experience.camera.instance;

    this.renderer.setRenderTarget(this.renderTargetA);
    this.renderer.render(this.experience.sceneA, camera);

    this.renderer.setRenderTarget(this.renderTargetB);
    this.renderer.render(this.experience.sceneB, camera);

    this.renderer.setRenderTarget(null);
    this.renderer.render(this.compositeScene, this.orthoCamera);
  }
}
