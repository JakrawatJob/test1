// pages/CameraPage.js
"use client";
import React from "react";
import { useEffect, useRef, useState } from "react";
import AigenFaceDetect from "./aigenprocess";
const CameraPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const aigenprocess = new AigenFaceDetect(videoRef, canvasRef);
  useEffect(() => {
    aigenprocess.modelaigen();
  }, []); // ให้ useEffect ทำงานเฉพาะครั้งแรก

  return (
    <div>
      <h1>Camera Page</h1>
      <video
        ref={videoRef}
        width="640"
        height="480"
        autoPlay
        style={{ display: "none" }}
      ></video>
      <canvas ref={canvasRef} width="640" height="480"></canvas>
    </div>
  );
};

export default CameraPage;
