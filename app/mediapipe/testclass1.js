// pages/CameraPage.js
"use client";
import React from "react";
import { useEffect, useRef } from "react";

import CameraController from "./aigenclass"; // ระบุ path ที่ถูกต้องไปยัง CameraController
import { FaceDetection } from "@mediapipe/face_detection/face_detection";
import {
  drawLandmarks,
  drawRectangle,
} from "@mediapipe/drawing_utils/drawing_utils";
const CameraPage = () => {
  const videoRef = useRef(null);
  const cameraController = new CameraController(videoRef);

  useEffect(() => {
    let faceDetection;
    const setupFaceDetection = async () => {
      faceDetection = new FaceDetection({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`,
      });

      faceDetection.setOptions({
        model: "short",
        minDetectionConfidence: 0.5,
      });
      cameraController.initCamera();
    };
    setupFaceDetection();
    // Cleanup function
    return () => {
      if (faceDetection) {
        faceDetection.close();
      }
    };
  }, []); // ให้ useEffect ทำงานเฉพาะครั้งแรก

  return (
    <div>
      <h1>Camera Page</h1>
      <video ref={videoRef} width="640" height="480" autoPlay></video>
    </div>
  );
};

export default CameraPage;
