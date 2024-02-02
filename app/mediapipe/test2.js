"use client";
import { useEffect, useRef } from "react";

const FaceDetectionPage = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const loadMediaPipe = async () => {
      const mediapipe = await import("@mediapipe/face_detection");

      const faceDetection = new mediapipe.FaceDetection({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`,
      });
      console.log(faceDetection, "TES", mediapipe);

      faceDetection.setOptions({
        model: "short",
        minDetectionConfidence: 0.5,
      });

      faceDetection.onResults((res) => {
        console.log(res);
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
              const onFrame = async () => {
                await faceDetection.send({ image: results });
                requestAnimationFrame(onFrame);
              };
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
      <video ref={videoRef} width="640" height="480" autoPlay muted></video>
    </div>
  );
};

export default FaceDetectionPage;
