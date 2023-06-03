import { useState } from "react";
import {
  Navigation,
  Logo,
  InputForm,
  Rank,
  FaceRecognition,
} from "./components";
import ParticlesBg from "particles-bg";
import "./App.css";

const PAT = "4449b2845cd94e64b8b1c7e75f2df75f";
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = "devdanny";
const APP_ID = "my-first-application";
// Change these to whatever model and image URL you want to use
const MODEL_ID = "face-detection";
// const MODEL_VERSION_ID = "aa7f35c01e0642fda5cf400f543e7c40";
const IMAGE_URL = "https://samples.clarifai.com/metro-north.jpg";

const raw = JSON.stringify({
  user_app_id: {
    user_id: USER_ID,
    app_id: APP_ID,
  },
  inputs: [
    {
      data: {
        image: {
          url: IMAGE_URL,
        },
      },
    },
  ],
});

const requestOptions = {
  method: "POST",
  headers: {
    Accept: "application/json",
    Authorization: "Key " + PAT,
  },
  body: raw,
};

function App() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setInputValue(target.value);
  };

  const handleSubmit = () => {
    console.log("submitted");
    fetch(
      `https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="app">
      <Navigation />
      <Logo />
      <Rank name={"Valerii"} entries={"#1"} />
      <InputForm
        onInputChange={handleInputChange}
        onButtonSubmit={handleSubmit}
      />
      <FaceRecognition imageUrl={inputValue} />

      <ParticlesBg type="cobweb" bg={true} num={200} color={"#ffffff"} />
    </div>
  );
}

export default App;
