import {
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from "three";

import Common from "@/graphics/Common";

export default class {
  constructor() {
    this.init();
  }
  init() {
    const geometry = new BoxGeometry( 2, 2, 2 );
    const material = new MeshBasicMaterial();

    this.mesh = new Mesh( geometry, material );
    Common.scene.add( this.mesh );
  }
  render() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.025;
  }
  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    Common.scene.remove(this.mesh);
  }
  resize() {}
}
