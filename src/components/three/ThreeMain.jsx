import { Canvas, useFrame, extend } from "@react-three/fiber";
import React, { useRef, useMemo } from "react";
import vertexShader from "./shaders/vertex.glsl.js";
import fragmentShader from "./shaders/fragment.glsl.js";
import { Effects, useGLTF } from "@react-three/drei";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

import { Vector2 } from "three";
extend({ UnrealBloomPass });

function CustomShader() {
  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_mouse: {
        value: new Vector2(0, 0),
      },
      u_viewport: {
        value: new Vector2(0, 0),
      },
    }),
    []
  );

  return (
    <>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        toneMapped={false}
      />
    </>
  );
}

function WeirdSphere(props) {
  const mesh = useRef();

  useFrame((state) => {
    const { clock, mouse, viewport } = state;
    const uniforms = mesh.current.material.uniforms;
    uniforms.u_time.value = clock.getElapsedTime();
    uniforms.u_mouse.value.x += (mouse.x - uniforms.u_mouse.value.x) * 0.075;
    uniforms.u_mouse.value.y += (mouse.y - uniforms.u_mouse.value.y) * 0.075;
    mesh.current.material.uniforms.u_viewport.value = new Vector2(
      viewport.width,
      viewport.height
    );
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={props.args} />
      {props.mat}
    </mesh>
  );
}

function OuterSphere(props) {
  const { nodes, materials } = useGLTF("/models/modifiedSphere.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        scale={1}
        geometry={nodes.Sphere.geometry}
        rotation={[-Math.PI * 1.5, 0, 0]}
      >
        <meshPhysicalMaterial
          attach="material"
          transmission={1}
          opacity={0}
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0.4}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/modifiedSphere.gltf");

function Lights(props) {
  return (
    <>
      <pointLight position={[-3.5, 0, -1.75]} intensity={3} />
      <pointLight position={[3.5, 0, -1.75]} intensity={3} />
    </>
  );
}

function Scene() {
  useFrame(({ camera, mouse }) => {
    camera.position.x += (mouse.x / 1.75 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y / 0.8 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <Lights />
      <WeirdSphere args={[1, 20]} mat={<CustomShader />} />
      <OuterSphere scale={1.75} />
    </>
  );
}

function ThreeMain() {
  return (
    <Canvas>
      <Effects>
        <unrealBloomPass threshold={0.4} radius={2} strength={0.6} />
      </Effects>
      <Scene />
    </Canvas>
  );
}

export default ThreeMain;
