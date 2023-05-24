// import hooks from r3f
import { useFrame, useThree } from "@react-three/fiber";

// import componenets
import WeirdSphere from "./WeirdSphere.jsx";
import Lights from "./Lights.jsx";
import OuterSphere from "./OuterSphere.jsx";

// scene component
function Scene() {
  // frame hook to update camera using mouse x and y positions
  useFrame(({ camera, mouse }) => {
    camera.position.x += (mouse.x / 1.75 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y / 0.8 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0); // update to look at center
  });

  // set the initial camera position
  useThree(({ camera }) => {
    console.log("changed");
    camera.position.z = 3.5;
  });

  // JSX for all the scene components
  return (
    <>
      <Lights />
      <WeirdSphere args={[1, 30]} />
      <OuterSphere scale={1.75} />
    </>
  );
}

export default Scene;
