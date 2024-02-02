"use client";
import { useEffect, useRef, useState } from "react";
import React from "react";
const PageWithImage = ({ dataURL }) => {
  const [imageURL, setImageURL] = useState("");

  // Function to convert Blob to Image URL
  const blobToImageURL = (blob) => {
    try {
      if (blob) {
        console.log(blob);
        return URL.createObjectURL(blob);
      } else {
        console.error("Blob is null or undefined.");
        return "";
      }
    } catch (error) {
      console.error("Error creating object URL:", error);
      return "";
    }
  };

  useEffect(() => {
    const dataURLtoBlob = (dataURL) => {
      if (dataURL) {
        const arr = dataURL.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }

        return new Blob([u8arr], { type: mime });
      }
    };

    const blob = dataURLtoBlob(dataURL);
    const url = blobToImageURL(blob);
    setImageURL(url);

    return () => {
      URL.revokeObjectURL(url); // Prevent memory leaks
    };
  }, [dataURL]);

  return <img src={imageURL} alt="Converted" />;
};

export default PageWithImage;
