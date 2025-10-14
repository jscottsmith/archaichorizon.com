// Vertex shader - displaces vertices based on frequency data
// Using CustomShaderMaterial
uniform sampler2D uFrequencyTexture;
uniform float uTime;
uniform float uSpeed;

varying float vElevation;
varying vec2 vUv;

void main() {
  // Pass UV coordinates to fragment shader
  vUv = uv;
  
  // Map UV directly to texture without scrolling
  // uv.y = 0 is the front edge (nearest camera), should get row 0 (newest data)
  // uv.y = 1 is the back edge (farthest), should get row 63 (oldest data)
  vec4 freqData = texture2D(uFrequencyTexture, vec2(uv.x, uv.y));
  float frequency = freqData.r;
  
  // Displace csm_Position in z for depth variation (perpendicular to the plane)
  csm_Position.z += frequency * 7.0;
  
  // Pass frequency value to fragment shader
  vElevation = frequency;
}

