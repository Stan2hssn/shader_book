uniform sampler2D tDiffuse;
uniform float uNoiseStrength;
uniform float uTime;

varying vec2 vUv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
    vec4 diffuseColor = texture2D(tDiffuse, vUv);
    vec3 color = diffuseColor.rgb;
    color += (random(vUv + vec2(uTime * 0.1054, uTime * 0.687534)) - 0.5) * uNoiseStrength;
    gl_FragColor = vec4(color, 1.0);
}
