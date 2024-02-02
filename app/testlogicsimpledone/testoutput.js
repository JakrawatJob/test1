"use client";
import { Button } from "@/components/ui/button";
import CameraController from "./aigenclasscamera";
import AigenFaceDetect from "./testclass1";
import { useEffect, useRef, useState } from "react";

const FaceDetectionPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [base64array, setBase64array] = useState({
    turnleft: [],
    turnright: [],
  });
  useEffect(() => {
    let faceDetection;
    const openCamera = async (video, face) => {
      const cameraopen = new CameraController(video, face);
      cameraopen.initCamera();
    };
    const faceDetectionClass = new AigenFaceDetect();
    const setupFaceDetection = async () => {
      faceDetectionClass.initFaceDetection(
        canvasRef.current,
        videoRef.current,
        base64array
      );
      faceDetection = faceDetectionClass.faceDetectionModule;
      openCamera(videoRef.current, faceDetection);
    };

    setupFaceDetection();
    const getbackbase64data = () => {
      console.log("data 222", faceDetectionClass.typeface, base64array);
    };
    const intervalId = setInterval(getbackbase64data, 100);
    return () => {
      clearInterval(intervalId);
      if (faceDetection) {
        faceDetection.close();
      }
    };
  }, [base64array]);

  const handleLogButtonClick = () => {
    console.log("Logged base64array.turnright:", base64array);
    console.log("Logged base64array.turnright:", base64array);
  };
  return (
    <div>
      <h1>MediaPipe Face Detection test</h1>
      <video ref={videoRef} playsInline style={{ display: "none" }}></video>
      <canvas ref={canvasRef} width="640" height="480"></canvas>

      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md mt-5 mb-5"
        onClick={handleLogButtonClick}
      >
        Log base64array.turnright
      </Button>
    </div>
  );
};

export default FaceDetectionPage;
