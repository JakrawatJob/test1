"use client";
import * as tf from "@tensorflow/tfjs";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import CameraController from "./aigenclasscamera";
import { useEffect, useRef, useState } from "react";
import { FaceDetection } from "@mediapipe/face_detection/face_detection";
import {
  drawLandmarks,
  drawRectangle,
} from "@mediapipe/drawing_utils/drawing_utils";

const FaceDetectionPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mirrormode, setMirrormode] = useState(true);
  const [showimg, setShowimg] = useState(true);
  const [base64call, setBase64call] = useState(null);
  const [enableLogButton, setEnableLogButton] = useState(false);
  const [base64array, setBase64array] = useState({
    turnleft: [],
    turnright: [],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const refvideo = videoRef.current;
    let faceDetection;
    const onFrame = async () => {
      if (faceDetection) {
        await faceDetection.send({ image: videoRef.current });
        requestAnimationFrame(onFrame);
      }
    };
    const setupFaceDetection = async () => {
      faceDetection = new FaceDetection({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`,
      });

      faceDetection.setOptions({
        model: "short",
        minDetectionConfidence: 0.5,
      });

      faceDetection.onResults((res) => {
        const w = canvas.width;
        const h = canvas.height;
        const g = canvas.getContext("2d");

        //console.log(refvideo);
        g.drawImage(refvideo, 0, 0, w, h); // remove draw image
        //const base64call1 = refvideo.toDataURL("image/jpeg");
        const base64call = canvas.toDataURL("image/jpeg");
        //console.log(base64call);

        g.save();
        if (mirrormode) {
          g.scale(-1, 1);
          g.translate(-w, 0);
        }
        g.clearRect(0, 0, w, h);
        showimg && g.drawImage(res.image, 0, 0, w, h);

        if (res.detections.length > 0) {
          //console.log(canvas);
          const detection = res.detections[0];
          drawRectangle(g, detection.boundingBox, {
            color: "blue",
            lineWidth: 4,
            fillColor: "#00000000",
          });
          drawLandmarks(g, detection.landmarks, {
            color: "red",
            radius: 5,
          });

          if (detection.landmarks) {
            const leftEyeLandmark = detection.landmarks[1].x;
            const leftearLandmark = detection.landmarks[5].x;
            const rightEyeLandmark = detection.landmarks[0].x;
            const rightearLandmark = detection.landmarks[4].x;

            if (rightEyeLandmark - rightearLandmark < 0.02) {
              base64array.turnright.push(base64call);
              if (base64array.turnright.length > 10) {
                let poppedElement = base64array.turnright.shift();
                setEnableLogButton(true);
              } else {
                setEnableLogButton(false);
              }

              // console.log(
              //   "turn right1",
              //   base64array.turnright,
              //   base64array.turnright.length
              // );
            }
            if (leftearLandmark - leftEyeLandmark < 0.02) {
              base64array.turnleft.push(base64call);
              if (base64array.turnleft.length > 10) {
                let poppedElement2 = base64array.turnleft.shift();
              }
              //console.log("turn left");
            }
          }
        }
        g.restore();
      });

      const cameraopen = new CameraController(videoRef, onFrame);
      cameraopen.initCamera();
    };
    setupFaceDetection();

    return () => {
      if (faceDetection) {
        faceDetection.close();
      }
    };
  }, [mirrormode, showimg, base64array.turnright]);
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
      {/*enableLogButton && (
        <button onClick={handleLogButtonClick}>
          Log base64array.turnright
        </button>
      )*/}
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md mt-5 mb-5"
        onClick={handleLogButtonClick}
      >
        Log base64array.turnright
      </Button>
      {/* Add your UI elements and controls here */}
    </div>
  );
};

export default FaceDetectionPage;
