"use client";
import { Checkbox } from "@/components/ui/checkbox";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useRef, useState } from "react";
import { FaceDetection } from "@mediapipe/face_detection/face_detection";
import {
  drawLandmarks,
  drawRectangle,
} from "@mediapipe/drawing_utils/drawing_utils";

const FaceDetectionPage = () => {
  const [cardModel, setCardModel] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mirrormode, setMirrormode] = useState(true);
  const [showimg, setShowimg] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    let faceDetection;
    const loadCardModel = async () => {
      try {
        const Model = await tf.loadGraphModel("/models/idcard/model.json");
        setCardModel(Model);
        console.log("async", cardModel);
      } catch (error) {
        console.error("Failed to load the card model:", error);
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
        g.save();
        if (mirrormode) {
          g.scale(-1, 1);
          g.translate(-w, 0);
        }
        g.clearRect(0, 0, w, h);
        showimg && g.drawImage(res.image, 0, 0, w, h);

        if (res.detections.length > 0) {
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
              console.log("turn right");
            }
            if (leftearLandmark - leftEyeLandmark < 0.02) {
              console.log("turn left");
            }
          }
        }
        g.restore();
      });

      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();

            const onFrame = async () => {
              if (onFrame) {
                await faceDetection.send({ image: videoRef.current });
                requestAnimationFrame(onFrame);
              }
            };

            onFrame();
          }
        })
        .catch((error) => console.error("Error accessing camera:", error));
    };
    loadCardModel();
    setupFaceDetection();

    return () => {
      if (faceDetection) {
        faceDetection.close();
      }
    };
  }, [mirrormode, showimg]);

  return (
    <div>
      <h1>MediaPipe Face Detection test</h1>
      <video ref={videoRef} playsInline style={{ display: "none" }}></video>
      <canvas ref={canvasRef} width="640" height="480"></canvas>

      <label className=" space-x-2">
        <Checkbox
          checked={showimg}
          onCheckedChange={() => setShowimg((prevShowimg) => !prevShowimg)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 space-x-2"
        >
          Show original image
        </label>
      </label>
      <label className=" space-x-2 ml-4">
        <Checkbox
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
        </label>
      </label>

      {/* Add your UI elements and controls here */}
    </div>
  );
};

export default FaceDetectionPage;
