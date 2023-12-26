import Device from "@/pure/Device";
import Common from "@/graphics/Common";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { Uniform } from "three";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

import {Vector2} from "three";

export default class PostProcessing {
  constructor() {
    const { width, height } = Device.viewport;
    this.passes = {};
    this.composers = {};

    this.composer = new EffectComposer(Common.renderer);
    this.composer.addPass(new RenderPass(Common.scene, Common.camera));

    this.mainPass = new ShaderPass({
      uniforms: {
        "tDiffuse": { value: null },
        "resolution": new Uniform(new Vector2(width * Device.pixelRatio, height * Device.pixelRatio)),
        "decay": new Uniform(1),
        "time": new Uniform(0)
      },
      vertexShader,
      fragmentShader
    })
    this.composer.addPass( this.mainPass );

  }
  render(t) {
    this.mainPass.uniforms.time.value = t;

    this.composer.render();
  }
  dispose() {
    this.composer.reset();
  }
  resize() {
    const { width, height } = Device.viewport;
    this.composer.setSize(width, height);
    this.mainPass.material.uniforms.resolution.value.set(width * Device.pixelRatio, height * Device.pixelRatio);
  }
}
