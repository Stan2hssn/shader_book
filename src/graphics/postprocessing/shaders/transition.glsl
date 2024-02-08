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
uniform float d;

#define PI 3.14159265359

float delay(float a, vec2 st) {
  float result = a + sin(floor(st.x * gridX) / gridX);
  return result * d;
}

float inverseDelay(float a, vec2 st) {
  float result = a - sin(floor(st.x * gridX) / gridX) / 15.;
  return result;
}

float delayReset(float a, vec2 st) {
  float result = a + sin(floor(st.x * gridX) / gridX);
  return result * d;
}

float r(vec2 st) {
  float vShift = delay(shift, st) * 3.;
  float gridy = gridY / 5.;
  float f = delay(frequency, st) * 1.5 - .24;

  float outer = floor(((st.y + f) * (PI / delay(scale, st) * .8)) * gridy) / gridy;
  float inner = floor(((st.y - inverseDelay(.45, st)) * (PI / delay(scale, st) * .8) - .2) * gridy) / gridy;
  float xOut = sin(outer) / (amplitude * 30.) + vShift;
  float xIn = pow(inner, 2.) / (amplitude * 60.) + vShift;

  st.x *= gridX;
  st = fract(st);

  return step(xOut * (tail), st.x) * step(xIn * (1. - head), 1. - st.x);
}

void main() {
  vec2 st = gl_FragCoord.xy / res.xy;
  vec3 color = mix(vec3(0.), panelColor, r(st));

  gl_FragColor = vec4(color, r(st));
}
