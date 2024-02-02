import React, { useRef, useEffect } from "react";
import { FaceDetection } from "@mediapipe/face-detection";

const FaceDetectionComponent = ({ onFaceDetected }) => {
  const videoRef = useRef();
  const faceDetectionRef = useRef();

  useEffect(() => {
    const runFaceDetection = async () => {
      faceDetectionRef.current = new FaceDetection({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face-detection/${file}`;
        },
      });

      await faceDetectionRef.current.setOptions({
        modelComplexity: 1,
        maxNumFaces: 1,
      });

      faceDetectionRef.current.onResults(handleResults);

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const videoStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        videoRef.current.srcObject = videoStream;
      }
    };

    runFaceDetection();

    return () => {
      if (faceDetectionRef.current) {
        faceDetectionRef.current.close();
      }
    };
  }, []);

  const handleResults = (results) => {
    const { faceDetections } = results;
    if (faceDetections.length > 0) {
      onFaceDetected(true);
    } else {
      onFaceDetected(false);
    }
  };

  return <video ref={videoRef} playsInline autoPlay muted />;
};

export default FaceDetectionComponent;
