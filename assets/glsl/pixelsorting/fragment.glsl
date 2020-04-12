#define VERT false

varying vec2 vUv;
uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_texture;
uniform float u_delta;

void main() {
  gl_FragColor = texture2D(u_texture, vUv);
}