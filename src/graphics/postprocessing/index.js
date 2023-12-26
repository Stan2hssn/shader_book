import Device from "@/pure/Device";
import Common from "@/graphics/Common";
import Input from "@/graphics/Input";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { Uniform } from "three";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/latelier.glsl";

import { Vector2 } from "three";
import gsap from "gsap";

export default class PostProcessing {
  constructor() {
    const { width, height } = Device.viewport;
    this.passes = {};
    this.composers = {};

    this.composer = new EffectComposer(Common.renderer);
    this.composer.addPass(new RenderPass(Common.scene, Common.camera));

    this.mainPass = new ShaderPass({
      uniforms: {
        res: new Uniform(
          new Vector2(width * Device.pixelRatio, height * Device.pixelRatio)
        ),
        time: new Uniform(0),
        slowMotion: new Uniform(0),
        coords: new Uniform(new Vector2(Input.coords.x, Input.coords.y)),
      },
      vertexShader,
      fragmentShader,
    });
    this.composer.addPass(this.mainPass);
  }
  render(t) {
    this.mainPass.uniforms.time.value = t;
    this.mainPass.uniforms.slowMotion.value = t / 2;

    // Animate the coords uniform's Vector2 value using GSAP
    gsap.to(this.mainPass.uniforms.coords.value, {
      x: Input.coords.x,
      y: Input.coords.y,
      duration: 0.3,
      ease: "linear",
    });

    this.composer.render();
  }
  dispose() {
    this.composer.reset();
  }
  resize() {
    const { width, height } = Device.viewport;
    this.composer.setSize(width, height);
    this.mainPass.material.uniforms.res.value.set(
      width * Device.pixelRatio,
      height * Device.pixelRatio
    );
  }
}
