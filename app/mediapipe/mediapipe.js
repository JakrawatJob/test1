// pages/mediapipe.js
"use client";
import React, { useEffect, useRef } from "react";
import { ControlUtils } from "https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js";
import { DrawingUtils } from "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js";
import { FaceDetection } from "https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/face_detection.js";
const Mediapipe = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const mirrormodeRef = useRef();
  const showimgRef = useRef();
  const faceDetectionRef = useRef();

  useEffect(() => {
    // Import necessary MediaPipe libraries here

    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const mirrormode = mirrormodeRef.current;
    const showimg = showimgRef.current;
    const g = canvasElement.getContext("2d");

    const faceDetection = new FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`,
    });

    // Set face detection options
    faceDetection.setOptions({
      model: "short",
      minDetectionConfidence: 0.5,
    });

    // Handle face detection results
    faceDetection.onResults((res) => {
      const w = canvasElement.width;
      const h = canvasElement.height;
      g.save();
      if (mirrormode.checked) {
        g.scale(-1, 1);
        g.translate(-w, 0);
      }
      g.clearRect(0, 0, w, h);
      if (showimg.checked) {
        g.drawImage(res.image, 0, 0, w, h);
      }
      if (res.detections.length > 0) {
        drawRectangle(g, res.detections[0].boundingBox, {
          color: "blue",
          lineWidth: 4,
          fillColor: "#00000000",
        });
        drawLandmarks(g, res.detections[0].landmarks, {
          color: "red",
          radius: 5,
        });
        if (res.detections[0].landmarks) {
          const leftEyeLandmark = res.detections[0].landmarks[1].x;
          const leftearLandmark = res.detections[0].landmarks[5].x;
          const rightEyeLandmark = res.detections[0].landmarks[0].x;
          const rightearLandmark = res.detections[0].landmarks[4].x;
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

    // Access user media and start face detection
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoElement.srcObject = stream;
        videoElement.play();

        const onFrame = async () => {
          await faceDetection.send({ image: videoElement });
          requestAnimationFrame(onFrame);
        };

        onFrame();
      })
      .catch((error) => console.error("Error accessing camera:", error));

    // Cleanup function
    return () => {
      // Perform any cleanup (e.g., stop video stream) if needed
    };
  }, []); // Run effect only once on component mount

  return (
    <div>
      <h1>MediaPipe Face Detection test</h1>
      <video ref={videoRef} playsInline style={{ display: "none" }} />
      <canvas ref={canvasRef} width="640" height="480" />
      <label>
        <input type="checkbox" ref={showimgRef} />
        show original image
      </label>
      <label>
        <input type="checkbox" ref={mirrormodeRef} defaultChecked />
        mirror mode
      </label>
      <hr />
    </div>
  );
};

export default Mediapipe;
