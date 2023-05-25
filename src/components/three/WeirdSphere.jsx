// import useMemo hook and Vector2 and useFrame from react, three & r3f
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector2, Vector3 } from "three";

// import shader files
import vertexShader from "./shaders/vertex.glsl.js";
import fragmentShader from "./shaders/fragment.glsl.js";

// custom shader component
function CustomShader() {
  // uniforms to pass to shader (Time, Mouse)
  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0.0,
      },
      uMouse: {
        value: new Vector2(0, 0),
      },
      uColor: {
        value: new Vector3(0.2, 0.3, 1),
      },
      uSwayScale: {
        value: 0.05,
      },
      uSwaySpeed: {
        value: 1.5,
      },
    }),
    []
  );

  // JSX pass in uniforms and shaders (tone mapped to false)
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

// custom sphere component
function WeirdSphere(props) {
  // ref for mesh
  const mesh = useRef();

  // UseFrame to update uniforms
  useFrame(({ clock, mouse }) => {
    // get the uniform object
    const uniforms = mesh.current.material.uniforms;
    uniforms.uTime.value = clock.getElapsedTime(); // set the time to elapsed time
    uniforms.uMouse.value.x += (mouse.x - uniforms.uMouse.value.x) * 0.075; // update x pos
    uniforms.uMouse.value.y += (mouse.y - uniforms.uMouse.value.y) * 0.075; // update y pos
  });

  // JSX with sphere and custom material
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={props.args} />
      <CustomShader />
    </mesh>
  );
}

export default WeirdSphere;
