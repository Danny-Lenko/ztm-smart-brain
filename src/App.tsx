import { Navigation, Logo, InputForm, Rank } from "./components";
import ParticlesBg from "particles-bg";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navigation />
      <Logo />
      <Rank name={"Valerii"} entries={"#1"} />
      <InputForm />

      <ParticlesBg type="cobweb" bg={true} num={200} color={"#ffffff"} />
    </div>
  );
}

export default App;
