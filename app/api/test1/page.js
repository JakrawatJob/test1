"use client"; // pages/index.js

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [base64Image, setBase64Image] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Base64 Image:", data.base64Image);
      } else {
        console.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" onChange={handleFileChange} />
      {base64Image && (
        <div>
          <img src={base64Image} alt="Uploaded" style={{ maxWidth: "100%" }} />
        </div>
      )}
      {file && (
        <div>
          <button onClick={handleUpload}>Upload Image</button>
        </div>
      )}
    </div>
  );
}
