"use client";
import React from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

const CameraOpen = ({ onTakePhoto }) => {
  return <Camera onTakePhoto={onTakePhoto} />;
};
console.log("hellow", CameraOpen);
export default CameraOpen;
