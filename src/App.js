// APP COMPONENT (includes everything)
import "./App.css";
import Header from "./components/Header.jsx";
import ThreeMain from "./components/three/ThreeMain.jsx";
import Hero from "./components/Hero.jsx";

function App() {
  return (
    <>
      <ThreeMain />
      <Header />
      <Hero />
    </>
  );
}

export default App;
