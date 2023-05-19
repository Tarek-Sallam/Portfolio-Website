import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import React, { useRef, useState, useEffect } from "react";
import vertexShader from "./shaders/vertex.glsl.js";
import fragmentShader from "./shaders/fragment.glsl.js";
import { Environment, OrbitControls, Effects } from "@react-three/drei";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

extend({ UnrealBloomPass });

/* function CustomShader() {
  return (
    <>
      <meshStandardMaterial
        onBeforeCompile={(shader) => {
          console.log(shader);
        }}
      />
    </>
  );
} */

function OuterSphere(props) {
  return (
    <mesh>
      <icosahedronGeometry args={props.args} />
      <meshPhysicalMaterial
        roughness={0}
        metalness={0}
        transmission={1}
        clearcoat={1}
        clearcoatRoughness={0.5}
      />
    </mesh>
  );
}

function InnerSphere(props) {
  return (
    <mesh>
      <icosahedronGeometry args={props.args} />
      <meshStandardMaterial
        opacity={0.5}
        emissive="blue"
        emissiveIntensity={2}
        toneMapped={false}
      />
    </mesh>
  );
}

function Main() {
  return (
    <Canvas>
      <Effects disableGamma>
        <unrealBloomPass threshold={0.1} strength={1} radius={2} />
      </Effects>
      <OuterSphere args={[2, 50]} />
      <InnerSphere args={[1, 50]} />
      <directionalLight color="white" intensity={2} position={[10, 0, -14]} />
      <directionalLight
        color="white"
        intensity={4}
        position={[-10, -2, -12.5]}
      />
    </Canvas>
  );
}

export default Main;
