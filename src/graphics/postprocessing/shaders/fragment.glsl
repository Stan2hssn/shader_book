uniform sampler2D tDiffuse;
uniform vec2 resolution;
uniform float time;
uniform float decay;

varying vec2 vUv;
varying float vTime;

float amount = 0.00125;
float angle = 0.0;
float haloRadius = 1.8; 

#pragma glslify: blur5 = require(./blur5.glsl)

float random (in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float halo(vec2 uv) {    
    return haloRadius-distance(uv,vec2(0.2,0.5))-distance(uv,vec2(0.8,0.5));
}
// vec3 channelSplit(sampler2D tex, vec2 uv){
// 	vec3 frag;
//   vec2 spread = amount * vec2( cos(angle), sin(angle));
// 	frag.r = texture2D(tex, uv + spread).r;
// 	frag.g = texture2D(tex, uv).g;
// 	frag.b = texture2D(tex, uv - spread).b;
// 	return frag;
// }


void main() {
  vec2 st = gl_FragCoord.xy / resolution;
  // vec4 color = vec4(channelSplit(tDiffuse, vUv), 1.0);

  float haloPower = mix(1.0, halo(st), decay);

  // gl_FragColor = vec4(vec3(haloPower), 1.0);
  gl_FragColor = blur5(tDiffuse, vUv, resolution, vec2((1. - haloPower) * 3.125));
  gl_FragColor.rgb += random(st + vTime) * 0.05;
  if (decay > 0.001) {
    gl_FragColor.rgb *= mix(1.0, (haloPower * 0.5 + 0.625), decay);
  }
}