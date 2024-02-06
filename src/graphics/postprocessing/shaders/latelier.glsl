uniform vec2 res;
uniform float time;
uniform float slowMotion;
uniform vec2 coords;

#define PI 3.1415926535897932384626433832795
#define TAU 6.283185307179586476925286766559
#define S(a, b, t) smoothstep(a, b, t)
#define RGB(r, g, b) vec3(r/255., g/255., b/255.)

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float grid(vec2 st, float width)
{
    st = st * 2. -1.;
    float AR = res.x/res.y;
    st.x *= AR;
    float size = 1.5;
    st = fract(st *size);
    vec2 border = step(vec2(width), st) - step(1. - vec2(width), st);

    return border.x * border.y; 
}

float circle(in vec2 st){
    st = st * 2. - 1.;
    float noise = sin(random(st) * sin(slowMotion)/4.);
    float AR = res.x/res.y;
    st -= coords;
    st.x *= AR;
    float l = length(st / 2.);
	return S(.0, 1., l) - S(.1, 0., l);
}

void main()
{
    // normalised and center pixel coordinates (from 0 to 1)
    vec2 st = gl_FragCoord.xy/res.xy;
    vec3 color = vec3(0.0);

    float delta = 0.008;
    float rgb = 50.0/255.0;
    vec3 bg = RGB(14., 14., 14.);
    float colorGrid = rgb - grid(st, .003);

    color = vec3(colorGrid) - vec3(circle(st - delta), circle(st), circle(st + delta));
    float mask = colorGrid - (circle(st) - colorGrid);
    
    gl_FragColor = vec4( vec3(colorGrid) - circle(st), mask);
}