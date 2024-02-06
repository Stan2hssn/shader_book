uniform vec2 res;
uniform float time;
uniform float slowMotion;
uniform vec2 coords;
uniform vec3 panelColor;
uniform float gridX;
uniform float gridY;
uniform float tail;
uniform float head;
uniform float frequency;
uniform float amplitude;
uniform float shift;
uniform float scale;

#define PI 3.14159265359

void main() {
  vec2 st = gl_FragCoord.xy / res.xy;

  st.x *= gridX;
  st = fract(st);

  float vShift = shift * 3.;
  float gridy = gridY / 5.;
  float f = frequency * 10.;
  float g = floor(((st.y + f) * (PI / scale)) * gridy) / gridy;
  float x = sin(g) / (amplitude * 60.) + vShift;
  float r = step(x * tail, st.x) * step(x * (1. - head), 1. - st.x);

  vec3 color = vec3(r); // Initialize color as black
  gl_FragColor = vec4(vec3(color), color);
}
