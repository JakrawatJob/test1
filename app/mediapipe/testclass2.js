// pages/CameraPage.js
"use client";
import React from "react";
import { useEffect, useRef } from "react";

import aigenFaceDetect from "./aigenclassold"; // ระบุ path ที่ถูกต้องไปยัง CameraController
import { FaceDetection } from "@mediapipe/face_detection/face_detection";
import {
  drawLandmarks,
  drawRectangle,
} from "@mediapipe/drawing_utils/drawing_utils";
const CameraPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraController = new aigenFaceDetect(videoRef.current, {
    onFrame: async () => {
      await faceDetection.send({ image: videoElement });
      await new Promise((resolve) => setTimeout(resolve, 500));
    },
  });

  let faceDetection;

  useEffect(() => {
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
        }
        g.restore();
      });

      cameraController.start();
    };
    setupFaceDetection();
    // Cleanup function
    return () => {};
  }, []); // ให้ useEffect ทำงานเฉพาะครั้งแรก

  return (
    <div>
      <h1>Camera Page</h1>
      <video ref={videoRef} width="640" height="480" autoPlay></video>
      <canvas ref={canvasRef} width="640" height="480"></canvas>
    </div>
  );
};

export default CameraPage;
