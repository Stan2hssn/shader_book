import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragmentDefault.glsl";

export default {
  uniforms: {
    tDiffuse: { value: null },
    uNoiseStrength: { type: "float", value: 0.04 },
    uTime: { type: "float", value: 0 }
  },

  vertexShader: vertexShader,
  fragmentShader: fragmentShader
};
