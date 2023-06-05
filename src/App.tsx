import { useState, useEffect } from "react";
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

export type FaceCoords = {
  leftCol: number;
  topRow: number;
  rightCol: number;
  bottomRow: number;
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [buttonIsActive, setButtonIsActive] = useState(false);
  const [faceBox, setFaceBox] = useState<FaceCoords | null>(null);

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
      .then((result) => calculateFaceLocation(result))
      .catch((error) => console.log("error", error));
  };

  const calculateFaceLocation = (data: any) => {
    const clarifaiCoords =
      data.outputs[0].data.regions[0].region_info.bounding_box;

    const faceCoords = {
      leftCol: clarifaiCoords.left_col * imageWidth,
      topRow: clarifaiCoords.top_row * imageHeight,
      rightCol: imageWidth - clarifaiCoords.right_col * imageWidth,
      bottomRow: imageHeight - clarifaiCoords.bottom_row * imageHeight,
    };

    setFaceBox(faceCoords);
  };

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: inputValue,
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

  const getImage = (image: HTMLImageElement) => {
    const width = image.clientWidth;
    const height = image.clientHeight;

    if (width && height) {
      setImageWidth(width);
      setImageHeight(height);
    } else {
      setImageWidth(0);
      setImageHeight(0);
    }
  };

  useEffect(() => {
    if (imageWidth && imageHeight) {
      setButtonIsActive(true);
    } else {
      setButtonIsActive(false);
    }
  }, [imageWidth, imageHeight]);

  return (
    <div className="app">
      <Navigation />
      <Logo />
      <Rank name={"Valerii"} entries={"#1"} />
      <InputForm
        onInputChange={handleInputChange}
        onButtonSubmit={handleSubmit}
        buttonIsActive={buttonIsActive}
      />
      <FaceRecognition
        imageUrl={inputValue}
        getImage={getImage}
        box={faceBox}
      />

      <ParticlesBg type="cobweb" bg={true} num={200} color={"#ffffff"} />
    </div>
  );
}

export default App;
