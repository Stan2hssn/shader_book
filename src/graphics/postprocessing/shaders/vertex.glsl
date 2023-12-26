uniform float time;
varying vec2 vUv;
varying float vTime;

void main() {
  vUv = uv;
  vTime = sin(floor(time * 8.0));
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}