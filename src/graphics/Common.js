import Device from "@/pure/Device"
import { Pane } from "tweakpane"

import { Scene, WebGLRenderer, Color, PerspectiveCamera } from "three"

class Common {
  scene = new Scene()
  params = {
    sceneColor: 0xbebebe,
  }

  constructor() {
    this.scene.background = new Color(0x10100f)
    this.camera = new PerspectiveCamera(50, Device.viewport.width / Device.viewport.height, 0.01, 100.0)
    this.camera.position.z = 10
  }

  init(canvas) {
    this.renderer = new WebGLRenderer({
      canvas: canvas,
      alpha: false,
      stencil: false,
      depth: true,
      powerPreference: "high-performance",
      antialias: false,
    })

    this.renderer.physicallyCorrectLights = true

    this.renderer.setPixelRatio(Device.pixelRatio)

    this.debug = window.location.hash === "#debug" ? new Pane() : null
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.renderer.dispose()
  }

  resize() {
    Device.viewport.width = this.renderer.domElement.parentElement.offsetWidth
    Device.viewport.height = this.renderer.domElement.parentElement.offsetHeight

    this.camera.aspect = Device.viewport.width / Device.viewport.height
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(Device.viewport.width, Device.viewport.height)
  }

  setDebug() {
    const { debug: pane, params, scene } = this

    params.sceneColor = "#FAF6EE"
    scene.background = new Color(params.sceneColor)

    this.debugFolder = pane.addFolder({
      title: "Common",
      expanded: false,
    })
  }
}

export default new Common()
