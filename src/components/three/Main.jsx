import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import font from "../../font/Kanit_SemiBold_Regular.json";
import Text from "./ThreeText.js";

function Box(props) {
  const mesh = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => (mesh.current.rotation.x += delta));

  const mat = {
    color: "red",
  };

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial {...mat} />
    </mesh>
  );
}

function Main() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Text text="TESTING" size={1} font={font} />
    </Canvas>
  );
}

export default Main;
