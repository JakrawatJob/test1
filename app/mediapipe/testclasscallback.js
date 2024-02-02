// pages/CameraPage.js
"use client";
import React from "react";
import { useEffect, useRef, useState } from "react";
import CameraPage from "./CameraPage";
const customdata = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {}, []); // ให้ useEffect ทำงานเฉพาะครั้งแรก

  return (
    <div>
      <h1>Camera Page</h1>
      <CameraPage />
    </div>
  );
};

export default customdata;
