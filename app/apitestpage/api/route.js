import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default upload.single("image")(async function handler(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { buffer } = req.file;

    if (!buffer) {
      return res.status(400).json({ error: "File buffer is empty" });
    }

    const base64Image = buffer.toString("base64");

    res.status(200).json({ base64Image });
  } catch (error) {
    console.error("Error in file upload handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
