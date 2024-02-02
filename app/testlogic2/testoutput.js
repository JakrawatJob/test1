"use client";
import * as tf from "@tensorflow/tfjs";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import CameraController from "./aigenclasscamera";
import AigenFaceDetect from "./testclass1";
import { useEffect, useRef, useState } from "react";

const FaceDetectionPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mirrormode, setMirrormode] = useState(false);
  const [showimg, setShowimg] = useState(true);
  const [base64array, setBase64array] = useState({
    turnleft: [],
    turnright: [],
  });

  useEffect(() => {
    let faceDetection;
    const onFrame = async () => {
      if (faceDetection) {
        await faceDetection.send({ image: videoRef.current });
        requestAnimationFrame(onFrame);
      }
    };
    const setupFaceDetection = async () => {
      const faceDetectionClass = new AigenFaceDetect();
      faceDetectionClass.initFaceDetection(
        canvasRef.current,
        videoRef.current,
        mirrormode,
        showimg,
        base64array
      );
      faceDetection = faceDetectionClass.faceDetectionModule;
      console.log(faceDetectionClass.base64);
      const cameraopen = new CameraController(videoRef, onFrame);
      cameraopen.initCamera();
    };
    setupFaceDetection();

    return () => {
      if (faceDetection) {
        faceDetection.close();
      }
    };
  }, [mirrormode, showimg]);
  const handleLogButtonClick = () => {
    console.log("Logged base64array.turnright:", base64array);
  };
  return (
    <div>
      <h1>MediaPipe Face Detection test</h1>
      <video ref={videoRef} playsInline style={{ display: "none" }}></video>
      <canvas ref={canvasRef} width="640" height="480"></canvas>
      <label>
        <input
          type="checkbox"
          checked={showimg}
          onChange={() => setShowimg((prevShowimg) => !prevShowimg)}
        />
        Show original image
      </label>

      <label className=" space-x-2 ml-4 ">
        <Checkbox
          className="mt-5"
          checked={mirrormode}
          onCheckedChange={() =>
            setMirrormode((prevMirrormode) => !prevMirrormode)
          }
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
        >
          Mirror mode
          <br />
        </label>
      </label>
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
