// Import Canvas extend, effects, and bloom pass from r3f, drei, and three
import { Canvas, extend } from "@react-three/fiber";
import { Effects } from "@react-three/drei";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import Scene from "./Scene.jsx";
// import styling for div
import "../styles/ThreeMain.css";

// extend the bloom pass to the r3f library
extend({ UnrealBloomPass });

// Main Canvas Component
function ThreeMain() {
  // JSX with the Scene and Effect components
  return (
    <div className="canvas-container">
      <Canvas>
        <Effects>
          <unrealBloomPass threshold={0.4} radius={2} strength={0.6} />
        </Effects>
        <Scene />
      </Canvas>
    </div>
  );
}

export default ThreeMain;
