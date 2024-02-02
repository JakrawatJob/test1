// pages/CameraPage.js
"use client";
import React from "react";
import { useEffect, useRef, useState } from "react";

import CameraController from "./aigenclasscamera"; // ระบุ path ที่ถูกต้องไปยัง CameraController
import { FaceDetection } from "@mediapipe/face_detection/face_detection";
import {
  drawLandmarks,
  drawRectangle,
} from "@mediapipe/drawing_utils/drawing_utils";
const CameraPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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
    const cameraController = new CameraController(videoRef, onFrame);
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
        g.drawImage(refvideo, 0, 0, w, h);
        const base64call = canvas.toDataURL("image/jpeg");
        //console.log(base64call);

        g.save();

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
