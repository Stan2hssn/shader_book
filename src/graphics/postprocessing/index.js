import Device from "@/pure/Device"
import Common from "@/graphics/Common"
import Input from "@/graphics/Input"

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js"
import { Vector2, Vector3, Uniform } from "three"

import vertexShader from "./shaders/vertex.glsl"
import fragmentShader from "./shaders/transition.glsl"

import gsap from "gsap"

export default class PostProcessing {
  params = {
    panelColor: { r: 255, g: 255, b: 255 },
    gridX: 6,
    gridY: 18,
    tail: 0,
    head: 0,
    frequency: 0.17,
    amplitude: 0.01,
    shift: 1,
    scale: 0.6,
  }

  constructor() {
    const { width, height } = Device.viewport
    const { panelColor, gridX, gridY, tail, head, frequency, amplitude, shift, scale } = this.params

    this.passes = {}
    this.composers = {}

    this.composer = new EffectComposer(Common.renderer)
    this.composer.addPass(new RenderPass(Common.scene, Common.camera))

    this.mainPass = new ShaderPass({
      uniforms: {
        res: new Uniform(new Vector2(width * Device.pixelRatio, height * Device.pixelRatio)),
        time: new Uniform(0),
        slowMotion: new Uniform(0),
        coords: new Uniform(new Vector2(Input.coords.x, Input.coords.y)),
        panelColor: new Uniform(new Vector3(panelColor.r / 255, panelColor.g / 255, panelColor.b / 255)),
        gridX: new Uniform(gridX),
        gridY: new Uniform(gridY),
        tail: new Uniform(tail),
        head: new Uniform(head),
        frequency: new Uniform(frequency),
        amplitude: new Uniform(amplitude),
        shift: new Uniform(shift),
        scale: new Uniform(scale),
      },
      vertexShader,
      fragmentShader,
    })
    this.composer.addPass(this.mainPass)
  }
  render(t) {
    this.mainPass.uniforms.time.value = t
    this.mainPass.uniforms.slowMotion.value = t / 2

    // Animate the coords uniform's Vector2 value using GSAP
    gsap.to(this.mainPass.uniforms.coords.value, {
      x: Input.coords.x,
      y: Input.coords.y,
      duration: 0.3,
      ease: "linear",
    })
    this.composer.render()
  }
  dispose() {
    this.composer.reset()
  }
  resize() {
    const { width, height } = Device.viewport
    this.composer.setSize(width, height)
    this.mainPass.material.uniforms.res.value.set(width * Device.pixelRatio, height * Device.pixelRatio)
  }

  setDebug(debug) {
    const { params } = this
    Common.debugFolder = debug.addFolder({
      title: "Post Processing",
      expanded: true,
    })
    Common.debugFolder.addBinding(Common.params, "sceneColor").on("change", () => {
      document.querySelector("canvas").style.backgroundColor = Common.params.sceneColor
    })

    Common.debugFolder.addBinding(params, "panelColor").on("change", () => {
      this.mainPass.uniforms.panelColor.value = new Vector3(
        this.params.panelColor.r / 255,
        this.params.panelColor.g / 255,
        this.params.panelColor.b / 255
      )
    })
    Common.debugFolder.addBinding(params, "gridX", { min: 1, max: 100, step: 1 }).on("change", () => {
      this.mainPass.uniforms.gridX.value = this.params.gridX
    })
    Common.debugFolder.addBinding(params, "gridY", { min: 2, max: 100, step: 1 }).on("change", () => {
      this.mainPass.uniforms.gridY.value = this.params.gridY
    })
    Common.debugFolder.addBinding(params, "tail", { min: 0, max: 1, step: 0.01 }).on("change", () => {
      this.mainPass.uniforms.tail.value = this.params.tail
    })
    Common.debugFolder.addBinding(params, "head", { min: 0, max: 1, step: 0.01 }).on("change", () => {
      this.mainPass.uniforms.head.value = this.params.head
    })
    Common.debugFolder.addBinding(params, "frequency", { min: 0, max: 1, step: 0.01 }).on("change", () => {
      this.mainPass.uniforms.frequency.value = this.params.frequency
    })
    Common.debugFolder.addBinding(params, "amplitude", { min: 0.04, max: 1, step: 0.01 }).on("change", () => {
      this.mainPass.uniforms.amplitude.value = this.params.amplitude
    })
    Common.debugFolder.addBinding(params, "shift", { min: 0, max: 1, step: 0.01 }).on("change", () => {
      this.mainPass.uniforms.shift.value = this.params.shift
    })
    Common.debugFolder.addBinding(params, "scale", { min: 0, max: 1, step: 0.01 }).on("change", () => {
      this.mainPass.uniforms.scale.value = this.params.scale
    })

    Common.debugFolder.addButton({ title: "play", label: "Animation" }).on("click", () => {
      gsap.fromTo(
        this.mainPass.uniforms.head,
        {
          value: 0,
        },
        {
          value: 1,
          duration: 1,
          ease: "power4.out",
        }
      )
      gsap.fromTo(
        this.mainPass.uniforms.tail,
        {
          value: 0,
        },
        {
          value: 1,
          duration: 1,
          delay: 0.4,
          ease: "power4.in",
        }
      )
    })
  }
}
