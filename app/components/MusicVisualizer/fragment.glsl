// Fragment shader - colors based on elevation
// Using CustomShaderMaterial
// Fog is handled automatically by the base material!
varying float vElevation;
varying vec2 vUv;

void main() {
  // Create gradient based on frequency intensity
  vec3 lowColor = vec3(0.1, 0.1, 0.3);  // Dark blue
  vec3 midColor = vec3(0.3, 0.5, 0.9);  // Bright blue
  vec3 highColor = vec3(0.9, 0.3, 0.9); // Purple/pink
  
  float intensity = clamp(vElevation, 0.0, 1.0);
  
  vec3 color;
  if (intensity < 0.5) {
    color = mix(lowColor, midColor, intensity * 2.0);
  } else {
    color = mix(midColor, highColor, (intensity - 0.5) * 2.0);
  }
  
  // Add some fade based on distance (further away = darker)
  float distanceFade = 1.0 - (vUv.y * 0.3);
  color *= distanceFade;
  
  // Set the diffuse color - CSM handles fog automatically!
  csm_DiffuseColor = vec4(color, 1.0);
}

