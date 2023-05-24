// import GLTF importer from drei
import { useGLTF } from "@react-three/drei";

// Outer Sphere component (custom model)
function OuterSphere(props) {
  // load the model
  const { nodes } = useGLTF("/models/modifiedSphere.gltf");
  // JSX group and mesh for model (with standard material)
  return (
    <group {...props} dispose={null}>
      <mesh
        scale={1}
        geometry={nodes.Sphere.geometry} // apply geometry
        rotation={[-Math.PI * 1.5, 0, 0]} // rotate for correction
      >
        <meshStandardMaterial roughness={0.5} color="blue" />
      </mesh>
    </group>
  );
}

// preload the model
useGLTF.preload("/models/modifiedSphere.gltf");

export default OuterSphere;
