"use client";

import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";

const CameraComponent = ({ onCapture }) => {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  }, [webcamRef, onCapture]);

  return (
    <div>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
      />
      <button onClick={capture}>Capture photo</button>
    </div>
  );
};

export default CameraComponent;
