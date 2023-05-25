// import hooks from r3f
import { useFrame } from "@react-three/fiber";

// import custom hook
import useCurrentWidth from "../hooks/useCurrentWidth.jsx";

// import componenets
import WeirdSphere from "./WeirdSphere.jsx";
import Lights from "./Lights.jsx";
import OuterSphere from "./OuterSphere.jsx";
import { Vector2 } from "three";

// scene component
function Scene() {
  const dist = useCurrentWidth() > 576 ? 3.5 : 5;
  // frame hook to update camera using mouse x and y positions
  useFrame(({ camera, mouse }) => {
    camera.position.x += (mouse.x / 1.75 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y / 0.8 - camera.position.y) * 0.05;
    let XY = new Vector2(camera.position.x, camera.position.y);
    camera.position.z = dist * Math.sin(Math.acos(XY.length() / dist)); // update z position
    camera.lookAt(0, 0, 0); // update to look at center
  });

  // JSX for all the scene components
  return (
    <>
      <Lights />
      <WeirdSphere args={[1, 40]} />
      <OuterSphere scale={1.75} />
    </>
  );
}

export default Scene;
