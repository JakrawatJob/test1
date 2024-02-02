"use client";
import CameraController from "./aigenclasscamera";
import { useEffect, useRef } from "react";
import { FaceDetection } from "@mediapipe/face_detection/face_detection";
import {
  drawLandmarks,
  drawRectangle,
} from "@mediapipe/drawing_utils/drawing_utils";

class AIGenFaceDetect {
  faceDetection;
  onFrame;
  cameraController;
  constructor(videoRef, canvasRef) {
    this.videoRef = videoRef;
    this.canvasRef = canvasRef;
    this.faceDetection = new FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`,
    });
    this.onFrame = async () => {
      if (this.faceDetection) {
        await this.faceDetection.send({ image: this.videoRef.current });
        requestAnimationFrame(this.onFrame);
      }
    };
    this.cameraController = new CameraController(this.videoRef, this.onFrame);
    this.cameraController.initCamera();
  }

  drawfaceshape = (res) => {
    const canvasDisplay = this.canvasRef;
    if (!canvasDisplay) {
      console.error("Canvas reference is undefined.");
      return;
    }

    const w = canvasDisplay.width || 640;
    const h = canvasDisplay.height || 480;
    canvasDisplay.save();
    canvasDisplay.clearRect(0, 0, w, h);
    if (res.detections.length > 0) {
      this.FaceDetected = true;
      drawRectangle(canvasDisplay, res.detections[0].boundingBox, {
        color: "red",
        lineWidth: 4,
        fillColor: "#00000000",
      });
    }
    canvasDisplay.restore();
  };

  setImageModel() {
    this.faceDetection.setOptions({
      model: "short",
      minDetectionConfidence: 0.5,
    });
    this.faceDetection.onResults((res) => {
      this.drawfaceshape(res);
    });
  }
}

export default AIGenFaceDetect;
