varying vec2 vUv;
uniform sampler2D u_texture;
uniform sampler2D u_next_texture;
uniform float u_direction;
uniform float u_delta;


void main () {
  vec2 uv_t = vec2(vUv.s, vUv.t);
  vec4 displace_current = texture2D(u_texture, uv_t);

  vec2 uv_displaced = vec2(vUv.x + (displace_current.g * 1.5) * u_delta, vUv.y);

  vec4 texture = texture2D(u_texture, uv_displaced);

  gl_FragColor = texture;
}