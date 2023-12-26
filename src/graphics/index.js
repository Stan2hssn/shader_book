import Input from "./Input";
import Common from "./Common";
import Output from "./Ouput";

import gsap from "gsap";

export default class {
  components = {};
  
  constructor({ canvas }) {
    Input.init();
    Common.init(canvas);

    this.output = new Output();

    this.init();
  }
  init() {
    this.resize();
    this.x = this.resize.bind(this);
    window.addEventListener("resize", this.x, false);

    gsap.ticker.add(this.render.bind(this));
  }
  render(t) {
    Input.render(t);
    this.output.render(t);
  }
  resize() {
    
    Input.resize();
    Common.resize();
    this.output.resize();
  }
  destroy() {
    window.removeEventListener("resize", this.x);

    Input.dispose();
    Common.dispose();
    this.output.dispose();
  }
}
