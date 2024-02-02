import CameraComponent from "./CameraComponent";

const Home = () => {
  const handleCapture = async (imageData) => {
    // ส่งข้อมูล base64 ไปยังเซิร์ฟเวอร์เพื่อประมวลผล
    const response = await fetch("/api/process-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageData }),
    });

    if (response.ok) {
      // ประมวลผลเสร็จสมบูรณ์
      const result = await response.json();
      console.log(result);
    } else {
      // มีข้อผิดพลาดในการประมวลผล
      console.error("Error processing image");
    }
  };

  return (
    <div>
      <h1>Webcam Capture</h1>
      <CameraComponent onCapture={handleCapture} />
    </div>
  );
};

export default Home;
