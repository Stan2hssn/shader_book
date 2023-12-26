// import Device from "@/pure/Device";

import Common from "@/graphics/Common";

import Powers from "@/graphics/components/Powers";

import PostProcessing from "@/graphics/postprocessing/index";

export default class Output {
  components = {};
  postProcess = true;

  constructor() {
    this.init();
  }

  init() {
    this.components.powers = new Powers();

    this.postprocessing = new PostProcessing();
  }

  render(t) {
    Object.keys(this.components).forEach(_ => {
      this.components[_].render(t);
    });
    if(!this.postProcess) {
      Common.render();
    } else {
      this.postprocessing.render(t);
    }
  }

  dispose() {
    Object.keys(this.components).forEach(_ => {
      this.components[_].dispose();
    });
    this.postprocessing.dispose();
  }

  resize() {
    Object.keys(this.components).forEach(_ => {
      this.components[_].resize();
    });
    this.postprocessing.resize();
  }
}
