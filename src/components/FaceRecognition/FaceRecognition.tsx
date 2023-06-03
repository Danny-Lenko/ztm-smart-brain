import "./FaceRecognition.css";

type Props = {
  imageUrl: string;
};

export const FaceRecognition: React.FC<Props> = ({ imageUrl }) => {

  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputimage" alt="" src={imageUrl} width="500px" />
        <div
          className="bounding-box"
          //  style={{
          //    top: box.topRow,
          //    right: box.rightCol,
          //    bottom: box.bottomRow,
          //    left: box.leftCol,
          //  }}
        ></div>
      </div>
    </div>
  );
};
