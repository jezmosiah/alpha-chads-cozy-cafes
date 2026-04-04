import { Howl } from "howler";
import gsap from "gsap";
import { Experience } from "../Experience";

export class Music {
  constructor() {
    this.experience = Experience.getInstance();

    this.tracks = ["/audio/music/LOOOOOOL.mp3", "/audio/music/Quirky.mp3"];
    this.currentTrackIndex = 0;
    this.isPlaying = false;
    this.howls = [];
    this.currentHowl = null;

    this.speakerObjects = [];
    this.bounceTweens = [];

    this.init();
  }

  init() {
    this.tracks.forEach((src) => {
      this.howls.push(this.createHowl(src));
    });
  }

  createHowl(src) {
    return new Howl({
      src: [src],
      loop: true,
      volume: 0.5,
    });
  }

  addTrack(src) {
    this.tracks.push(src);
    this.howls.push(this.createHowl(src));
  }

  registerSpeaker(intersectObject) {
    this.speakerObjects.push(intersectObject);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      this.currentTrackIndex =
        (this.currentTrackIndex + 1) % this.tracks.length;
    } else {
      this.play();
    }
  }

  play() {
    this.stopAudio();

    this.currentHowl = this.howls[this.currentTrackIndex];
    this.currentHowl.seek(0);
    this.currentHowl.play();

    this.isPlaying = true;
    this.startSpeakerBounce();
  }

  stop() {
    this.stopAudio();
    this.isPlaying = false;
    this.stopSpeakerBounce();
  }

  stopAudio() {
    if (this.currentHowl) {
      this.currentHowl.stop();
      this.currentHowl = null;
    }
  }

  startSpeakerBounce() {
    this.stopSpeakerBounce();

    this.speakerObjects.forEach((obj) => {
      const base = obj.originalScale;
      // Kill any active hover tweens on this mesh's scale first
      gsap.killTweensOf(obj.mesh.scale);

      const tween = gsap.fromTo(
        obj.mesh.scale,
        {
          x: base.x,
          y: base.y,
          z: base.z,
        },
        {
          x: base.x * 1.05,
          y: base.y * 1.2,
          z: base.z * 1.05,
          duration: 0.3,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
        },
      );
      this.bounceTweens.push(tween);
    });
  }

  stopSpeakerBounce() {
    this.bounceTweens.forEach((tween) => tween.kill());
    this.bounceTweens = [];

    this.speakerObjects.forEach((obj) => {
      gsap.killTweensOf(obj.mesh.scale);
      gsap.to(obj.mesh.scale, {
        x: obj.originalScale.x,
        y: obj.originalScale.y,
        z: obj.originalScale.z,
        duration: 0.3,
        ease: "back.out(2)",
      });
    });
  }

  setVolume(vol) {
    this.howls.forEach((howl) => {
      howl.volume(vol);
    });
  }

  destroy() {
    this.stop();
    this.howls.forEach((howl) => howl.unload());
    this.howls = [];
    this.speakerObjects = [];
    this.bounceTweens = [];
  }
}
