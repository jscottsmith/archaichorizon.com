"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useAudioAnalyzer } from "../../hooks/useAudioAnalyzer";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import CustomShaderMaterial from "three-custom-shader-material";

// Import shader files
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

type PlaneArgs = [
  number, // width
  number, // height
  number, // width segments
  number, // height segments
];

const planeArgs: PlaneArgs = [20, 80, 63, 127];
const fogColor = new THREE.Color(0xffeedd);

const isWireframe = false;

// Animated frequency terrain component
function FrequencyTerrain({
  getFrequencyData,
}: {
  getFrequencyData: () => Float32Array;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);

  // Create a texture to hold frequency data
  const frequencyTexture = useMemo(() => {
    const size = 64;
    const data = new Float32Array(size * size * 4);
    const texture = new THREE.DataTexture(
      data,
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Create shader material uniforms (no need for fog uniforms - CSM handles it!)
  const uniforms = useMemo(
    () => ({
      uFrequencyTexture: { value: frequencyTexture },
      uTime: { value: 0 },
      uSpeed: { value: 0.1 },
    }),
    [frequencyTexture]
  );

  useFrame((state) => {
    const frequencyData = getFrequencyData();

    if (materialRef.current) {
      // Update time uniform for scrolling effect
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

      // Update frequency texture with current frequency data
      const textureData = frequencyTexture.image.data as Float32Array;
      const size = 64;

      // Shift existing data down one row (scroll effect)
      for (let y = size - 1; y > 0; y--) {
        for (let x = 0; x < size; x++) {
          const currentIdx = (y * size + x) * 4;
          const prevIdx = ((y - 1) * size + x) * 4;
          textureData[currentIdx] = textureData[prevIdx];
          textureData[currentIdx + 1] = textureData[prevIdx + 1];
          textureData[currentIdx + 2] = textureData[prevIdx + 2];
          textureData[currentIdx + 3] = textureData[prevIdx + 3];
        }
      }

      // Add new frequency data to the first row
      for (let x = 0; x < size; x++) {
        const freqIndex = Math.floor((x / size) * frequencyData.length);
        const frequency = frequencyData[freqIndex] || 0;
        const idx = x * 4;
        textureData[idx] = frequency;
        textureData[idx + 1] = frequency;
        textureData[idx + 2] = frequency;
        textureData[idx + 3] = 1.0;
      }

      // Debug: Log max frequency every 60 frames
      // if (Math.floor(state.clock.elapsedTime * 60) % 60 === 0) {
      //   const maxFreq = Math.max(...Array.from(frequencyData));
      //   console.log(
      //     "Max frequency:",
      //     maxFreq,
      //     "Data length:",
      //     frequencyData.length
      //   );
      // }

      frequencyTexture.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Original mesh - right side */}
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 3, 0, 0]}
        position={[-planeArgs[0] / 2, -2, 0]}
      >
        <planeGeometry args={planeArgs} />
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={THREE.MeshStandardMaterial}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          wireframe={isWireframe}
          side={THREE.DoubleSide}
          flatShading={false}
        />
      </mesh>

      {/* Mirrored mesh - left side, shares same texture */}
      <mesh
        rotation={[-Math.PI / 3, 0, 0]}
        position={[planeArgs[0] / 2, -2, 0]}
        scale={[-1, 1, 1]}
      >
        <planeGeometry args={planeArgs} />
        <CustomShaderMaterial
          baseMaterial={THREE.MeshStandardMaterial}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          wireframe={isWireframe}
          side={THREE.DoubleSide}
          flatShading={false}
        />
      </mesh>
    </group>
  );
}

// Main 3D visualizer component
export function MusicVisualizer() {
  // Call the audio analyzer hook outside the Canvas
  const { getFrequencyData } = useAudioAnalyzer();

  return (
    <>
      <Canvas camera={{ position: [0, 4, 12], fov: 60 }}>
        <color attach="background" args={[fogColor]} />
        <fog attach="fog" args={[fogColor, 10, 70]} />
        <FrequencyTerrain getFrequencyData={getFrequencyData} />

        {/* Enhanced lighting for better visibility */}
        <ambientLight intensity={0.4} />
        {/* <directionalLight position={[5, 10, 5]} intensity={0.8} /> */}
        <directionalLight position={[-5, 5, 5]} intensity={0.7} />
        {/* <pointLight position={[0, 5, 8]} intensity={1.0} color="#4a90e2" /> */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={30}
        />
      </Canvas>
    </>
  );
}
