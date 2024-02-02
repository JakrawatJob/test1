// pages/api/upload.js

import multer from "multer";
import { ApiHandler } from "@aitoraznar/next-api-decorators";

const upload = multer({ dest: "./public/uploads/" });

class UploadApi extends ApiHandler {
  @upload.single("image")
  post(req, res) {
    if (!req.file) {
      return res.status(400).json({ error: "Please provide an image file." });
    }

    const base64Image = req.file.buffer.toString("base64");
    res.status(200).json({ base64Image });
  }
}

export default UploadApi;
