import React, { useEffect, useState } from "react";

const YourComponent = () => {
  const [testfacedetect, setTestFaceDetect] = useState(null);

  useEffect(() => {
    // สร้าง instance ของ aigenFaceProcessCanvas เมื่อ component ถูก mount
    const newTestFaceDetect = new aigenFaceProcessCanvas(1280, 720);
    setTestFaceDetect(newTestFaceDetect);

    // เซ็ต Image Model
    newTestFaceDetect.setImageModel();

    // ตั้งค่า interval เพื่อเรียก returnbase64 ทุก 100 มิลลิวินาที
    const intervalId = setInterval(returnBase64, 100);

    // ตอนที่ component ถูก unmount ให้ clear interval
    return () => clearInterval(intervalId);
  }, []); // ในกรณีนี้จะ run ครั้งเดียวเมื่อ component ถูก mount

  const returnBase64 = () => {
    if (testfacedetect && testfacedetect.FaceDetected) {
      console.log(testfacedetect.FaceDetected, testfacedetect.base64call);
    }
  };

  return <div>Your JSX here</div>;
};

export default YourComponent;
