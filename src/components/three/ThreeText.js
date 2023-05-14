import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";

extend({ TextGeometry });

function Text(props) {
  const font = new FontLoader().parse(props.font);
  const ref = useRef(null);

  useEffect(() => {
    ref.current.geometry.center();
  }, []);

  return (
    <mesh {...props.meshProps} ref={ref} rotation={[0, 0, 0]}>
      <textGeometry
        args={[props.text, { font, size: props.size, height: 0.35 }]}
      />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

export default Text;
