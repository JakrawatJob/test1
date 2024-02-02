"use client";
import React, { useState } from "react";
import CameraOpen from "./cameraopen";

const CameraPage = () => {
  const [dataUri, setDataUri] = useState(null);
  console.log([dataUri, setDataUri]);
  const onTakePhoto = (dataUri) => {
    console.log("Take photo", dataUri);
    setDataUri(dataUri);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
        <h1 className={`mb-3 text-2xl font-semibold flex items-center`}>
          Camera Page
        </h1>
        <CameraOpen onTakePhoto={(dataUri) => onTakePhoto(dataUri)} />
        {dataUri && <img src={dataUri} alt="Captured" />}
      </div>
    </main>
  );
};

export default CameraPage;
