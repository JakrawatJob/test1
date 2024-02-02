"use client";
import { useEffect, useRef } from "react";
import Face1 from "./facedetectscript.js";
const FaceDetectionPage = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const loadMediaPipe = async () => {
      const faceDetection = new Face1.FaceDetection({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`,
      });
      console.log(faceDetection, "TES2", mediapipe);

      faceDetection.setOptions({
        model: "short",
        minDetectionConfidence: 0.5,
      });

      faceDetection.onResults((res) => {
        console.log("dtaat", res);
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
      const runFaceDetection = async () => {
        const video = videoRef.current;
        const camera = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        video.srcObject = camera;

        video.addEventListener("loadeddata", () => {
          faceDetection.setOptions({
            input: video,
            onResults: (results) => {
              console.log(results);
              // Handle face detection results here
            },
            hideBoundingBox: false,
          });

          faceDetection.onResults();
        });
      };

      runFaceDetection();
    };

    loadMediaPipe();
  }, []);

  return (
    <div>
      <Face1 />
      <canvas id="canvasElement" width="640" height="480"></canvas>
      <label>
        <input type="checkbox" id="showimg" />
        show original image
      </label>
      <label>
        <input type="checkbox" id="mirrormode" checked />
        mirror mode
      </label>
      <video ref={videoRef} width="640" height="480" autoPlay muted></video>
    </div>
  );
};

export default FaceDetectionPage;
