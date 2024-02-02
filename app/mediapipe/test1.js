"use client";
import React, { useEffect, useRef } from "react";
import Head from "next/head";
const MediaPipeFaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadMediaPipe = async () => {
      // Wait for the global variables to be available
      await new Promise((resolve) => {
        // Check if the necessary variables are available at intervals
        const checkAvailability = () => {
          if (
            window.FaceDetection &&
            window.drawRectangle &&
            window.drawLandmarks
          ) {
            resolve();
          } else {
            setTimeout(checkAvailability, 50);
          }
        };

        checkAvailability();
      });

      const { FaceDetection, drawRectangle, drawLandmarks } = window;

      const videoElement = videoRef.current;
      const canvasElement = canvasRef.current;
      const mirrormode = document.getElementById("mirrormode");
      const showimg = document.getElementById("showimg");
      const g = canvasElement.getContext("2d");

      const faceDetection = new FaceDetection({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`,
      });

      faceDetection.setOptions({
        model: "short",
        minDetectionConfidence: 0.5,
      });

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
    };

    loadMediaPipe();
  }, []); // Run once on component mount

  // Run once on component mount

  return (
    <div>
      <Head>
        <script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/face_detection.js"
          crossOrigin="anonymous"
        />
      </Head>
      <h1>MediaPipe Face Detection test</h1>
      <video ref={videoRef} playsInline style={{ display: "none" }}></video>
      <canvas ref={canvasRef} width="640" height="480"></canvas>
      <label>
        <input type="checkbox" id="showimg" />
        show original image
      </label>
      <label>
        <input type="checkbox" id="mirrormode" defaultChecked />
        mirror mode
      </label>
      <hr />
    </div>
  );
};

export default MediaPipeFaceDetection;
