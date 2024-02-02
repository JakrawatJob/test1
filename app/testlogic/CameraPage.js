// pages/CameraPage.js
"use client";
import React, { Component } from "react";
import CameraController from "./aigenclasscamera";
import { FaceDetection } from "@mediapipe/face_detection/face_detection";
import {
  drawLandmarks,
  drawRectangle,
} from "@mediapipe/drawing_utils/drawing_utils";

class CameraPage extends Component {
  base64call;
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
    this.faceDetection = null;
  }

  componentDidMount() {
    this.setupCamera();
  }

  componentWillUnmount() {
    if (this.faceDetection) {
      this.faceDetection.close();
    }
  }

  onFrame = async () => {
    if (this.faceDetection) {
      await this.faceDetection.send({ image: this.videoRef.current });
      requestAnimationFrame(this.onFrame);
    }
  };

  setupCamera = async () => {
    const canvas = this.canvasRef.current;
    const video = this.videoRef.current;

    this.faceDetection = new FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`,
    });
    this.faceDetection.setOptions({
      model: "short",
      minDetectionConfidence: 0.5,
    });

    this.faceDetection.onResults((res) => {
      const w = canvas.width;
      const h = canvas.height;
      const g = canvas.getContext("2d");

      g.drawImage(video, 0, 0, w, h);
      this.base64call = canvas.toDataURL("image/jpeg");

      g.save();

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
        this.props.onBase64Call(base64call);
      }

      g.restore();
    });

    const cameraController = new CameraController(this.videoRef, this.onFrame);
    cameraController.initCamera();
    //console.log(cameraController.datatest);
  };

  render() {
    return (
      <div>
        <h1>Camera Page</h1>
        <video
          ref={this.videoRef}
          width="640"
          height="480"
          autoPlay
          style={{ display: "none" }}
        ></video>
        <canvas ref={this.canvasRef} width="640" height="480"></canvas>
      </div>
    );
  }
}

export default CameraPage;
