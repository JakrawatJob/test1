"use client";
import { useEffect, useRef, useState } from "react";

const FaceDetectionPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mirrormode, setMirrormode] = useState(true);
  const [showimg, setShowimg] = useState(false);

  useEffect(() => {
    let faceDetection;

    const setupFaceDetection = async () => {
      const { FaceDetection } = await import(
        "@mediapipe/face_detection/face_detection"
      );

      const { drawLandmarks, drawRectangle } = await import(
        "@mediapipe/drawing_utils/drawing_utils"
      );

      faceDetection = new FaceDetection({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`,
      });

      faceDetection.setOptions({
        model: "short",
        minDetectionConfidence: 0.5,
      });

      faceDetection.onResults((res) => {
        //console.log("dataa", res);
        const w = canvasRef.current.width;
        const h = canvasRef.current.height;
        const g = canvasRef.current.getContext("2d");

        g.save();
        if (mirrormode) {
          g.scale(-1, 1);
          g.translate(-w, 0);
        }
        g.clearRect(0, 0, w, h);
        if (showimg) {
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
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();

            const onFrame = async () => {
              if (onFrame) {
                await faceDetection.send({ image: videoRef.current });
                requestAnimationFrame(onFrame);
              }
            };

            onFrame();
          }
        })
        .catch((error) => console.error("Error accessing camera:", error));
    };

    setupFaceDetection();

    return () => {
      // Clean up resources when the component unmounts
      if (faceDetection) {
        faceDetection.close();
      }
    };
  }, [mirrormode, showimg]);

  return (
    <div>
      <h1>MediaPipe Face Detection test</h1>
      <video ref={videoRef} playsInline style={{ display: "none" }}></video>
      <canvas ref={canvasRef} width="640" height="480"></canvas>
      <label>
        <input
          type="checkbox"
          checked={showimg}
          onChange={() => setShowimg(!showimg)}
        />
        Show original image
      </label>
      <label>
        <input
          type="checkbox"
          checked={mirrormode}
          onChange={() => setMirrormode(!mirrormode)}
        />
        Mirror mode
      </label>
      {/* Add your UI elements and controls here */}
    </div>
  );
};

export default FaceDetectionPage;
