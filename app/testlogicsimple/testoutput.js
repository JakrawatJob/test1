"use client";
import { Button } from "@/components/ui/button";
import CameraController from "./aigenclasscamera";
import AigenFaceDetect from "./testclass1";
import Link from "next/link";
import PageWithImage from "./PageWithImage";
import CarouselPage from "./CarouselPage";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
const FaceDetectionPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [base64StateLEFT, setbase64StateLEFT] = useState("");
  const [base64StateRIGHT, setbase64StateRIGHT] = useState("");
  const [base64StateUP, setbase64StateUP] = useState("");
  const [base64StateDOWN, setbase64StateDOWN] = useState("");

  const faceDetectionClass = new AigenFaceDetect();
  const [showImage, setShowImage] = useState(false);
  const [base64Data, setbase64Data] = useState();
  //let base64Data = faceDetectionClass.base64array.lookdown[0];

  useEffect(() => {
    let faceDetection;
    const openCamera = async (video, face) => {
      const cameraopen = new CameraController(video, face);
      cameraopen.initCamera();
    };
    const setupFaceDetection = async () => {
      faceDetectionClass.initFaceDetection(canvasRef.current, videoRef.current);
      faceDetection = faceDetectionClass.faceDetectionModule;
      openCamera(videoRef.current, faceDetection);
    };

    setupFaceDetection();
    const intervalId = setInterval(getbackbase64data, 500);

    return () => {
      clearInterval(intervalId);
      if (faceDetection) {
        faceDetection.close();
      }
    };
  }, []);
  const getbackbase64data = () => {
    if (faceDetectionClass.base64array.turnleft) {
      setbase64StateLEFT(faceDetectionClass.base64array.turnleft[0]);
    }
    //console.log(base64Data);
    const action =
      faceDetectionClass.randomAction.actions[
        faceDetectionClass.randomAction.list
      ];
    console.log(
      faceDetectionClass.typeface,
      action,
      faceDetectionClass.base64array
    );
  };
  const handleLogButtonClick = () => {
    const dta = getbackbase64data();
    console.log("Logged base64array", dta);
  };
  const handleButtonClick = () => {
    // เมื่อคลิกปุ่มให้แสดงรูปภาพ
    setShowImage(true);
  };
  return (
    <div>
      <h1>MediaPipe Face Detection test</h1>
      <video ref={videoRef} playsInline></video>
      <canvas ref={canvasRef} width="640" height="480"></canvas>
      <CarouselPage />
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md mt-5 mb-5"
        onClick={handleLogButtonClick}
      >
        Log base64array.turnright
      </Button>
      <img src={base64StateLEFT} alt="Converted" />
      {/* {base64StateLEFT && <PageWithImage dataURL={base64StateLEFT} />} */}
    </div>
  );
};

export default FaceDetectionPage;
