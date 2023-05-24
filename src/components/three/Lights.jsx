// Lights Component
function Lights() {
  return (
    <>
      <pointLight position={[3.8, 0, -1.75]} intensity={2} />
      <pointLight position={[-3.8, 0, -1.75]} intensity={2} />
      <pointLight position={[-3.6, 0.65, -1.75]} intensity={2} />
      <pointLight position={[3.6, 0.65, -1.75]} intensity={2} />
      <pointLight position={[-3.6, -0.65, -1.75]} intensity={2} />
      <pointLight position={[3.6, -0.65, -1.75]} intensity={2} />
    </>
  );
}

export default Lights;
