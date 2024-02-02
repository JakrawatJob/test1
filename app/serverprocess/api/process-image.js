export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { imageData } = req.body;

      // ทำประมวลผลรูปภาพที่ได้รับ (ตัวอย่าง: แปลงเป็น base64)
      const processedData = await processImage(imageData);

      // ส่งผลลัพธ์กลับไปยัง client
      res.status(200).json({ processedData });
    } catch (error) {
      console.error("Error processing image:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

// ฟังก์ชันที่ให้แก่การประมวลผลรูปภาพ (ตัวอย่าง)
async function processImage(imageData) {
  // ทำอะไรกับข้อมูลรูปภาพที่ได้รับ
  return `Processed: ${imageData}`;
}
