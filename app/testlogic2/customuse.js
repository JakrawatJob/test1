"use client";

import AIGenFaceDetect from "./aigenclasspeocess";
import { useEffect, useRef, useState } from "react";
const FaceDetectionPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const setupFaceDetection = async () => {
      if (videoRef.current) {
        const faceDetector = new AIGenFaceDetect(
          videoRef.current,
          canvasRef.current
        );
        faceDetector.setImageModel();
      } else {
        console.error("Video reference is undefined.");
      }
    };
    setupFaceDetection();
  }, []);

  return (
    <div>
      <h1>MediaPipe Face Detection test</h1>
      <video ref={videoRef} playsInline style={{ display: "none" }}></video>
      <canvas ref={canvasRef} width="640" height="480"></canvas>
    </div>
  );
};

export default FaceDetectionPage;
