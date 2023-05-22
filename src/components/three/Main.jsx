import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import React, { useRef, useState, useEffect, forwardRef, useMemo } from "react";
import vertexShader from "./shaders/vertex.glsl.js";
import vertexShader2 from "./shaders/vertex2.glsl.js";
import fragmentShader from "./shaders/fragment.glsl.js";
import { Environment, OrbitControls, Effects } from "@react-three/drei";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

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
  return (
    <mesh>
      <icosahedronGeometry args={props.args} />
      <meshPhysicalMaterial
        clearcoat={1}
        clearcoatRoughness={0.5}
        transmission={0.9}
        roughness={0}
        opacity={0}
      />
    </mesh>
  );
}

function Lights(props) {
  return (
    <>
      <directionalLight position={[1, 0, -1.4]} />
      <directionalLight position={[-1, 0, -1.4]} />
    </>
  );
}

function Scene() {
  useFrame(({ camera, mouse }) => {
    camera.position.x += (mouse.x / 1.75 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y / 1.1 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <Lights />
      <WeirdSphere args={[1, 20]} mat={<CustomShader />} />
      <OuterSphere args={[1.5, 20]} />
    </>
  );
}

function Main() {
  return (
    <Canvas>
      <Effects>
        <unrealBloomPass threshold={0.4} radius={2} strength={0.5} />
      </Effects>
      <Scene />
    </Canvas>
  );
}

export default Main;
