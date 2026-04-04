import * as THREE from "three/webgpu";
import { Experience } from "../Experience";
import { ChadCafe } from "./ChadCafe";
import { CapybaraCafe } from "./CapybaraCafe";
import { NightMode } from "./NightMode";
import { Music } from "./Music";

export class World {
  constructor() {
    this.experience = Experience.getInstance();

    this.experience.resources.on("ready", () => {
      this.chadcafe = new ChadCafe();
      this.capybaracafe = new CapybaraCafe();
      this.nightMode = new NightMode();
      this.music = new Music();

      const musicA = this.experience.raycaster.intersectObjectsA.filter(
        (o) => o.pairKey === "musictrolls",
      );
      const musicB = this.experience.raycaster.intersectObjectsB.filter(
        (o) => o.pairKey === "musictrolls",
      );
      [...musicA, ...musicB].forEach((obj) => {
        this.music.registerSpeaker(obj);
      });
    });

    this.init();
  }

  init() {}

  resize() {}

  update() {
    if (!this.chadcafe || !this.capybaracafe) return;
    this.chadcafe.update();
    this.capybaracafe.update();
  }
}
