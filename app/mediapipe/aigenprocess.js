import { FaceDetection } from "@mediapipe/face_detection/face_detection";
import {
  drawLandmarks,
  drawRectangle,
} from "@mediapipe/drawing_utils/drawing_utils";
import CameraController from "./aigenclasscamera";
class AigenFaceDetect {
  constructor(videoRef, canvasRef) {
    this.videoRef = videoRef;
    this.canvasRef = canvasRef;
  }

  modelaigen() {
    let faceDetection;
    const onFrame = async () => {
      if (faceDetection) {
        await faceDetection.send({ image: this.videoRef.current });
        requestAnimationFrame(onFrame);
      }
    };
    const cameraController = new CameraController(this.videoRef, onFrame);
    const setupFaceDetection = async () => {
      faceDetection = new FaceDetection({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`,
      });
      faceDetection.setOptions({
        model: "short",
        minDetectionConfidence: 0.5,
      });
      faceDetection.onResults((res) => {
        const w = this.canvasRef.width;
        const h = this.canvasRef.height;
        const g = this.canvasRef.getContext("2d");

        //console.log(refvideo);
        g.drawImage(refvideo, 0, 0, w, h);
        const base64call = this.canvasRef.toDataURL("image/jpeg");
        console.log(base64call);

        g.save();

        if (res.detections.length > 0) {
          //console.log(canvas);
          const detection = res.detections[0];
          drawRectangle(g, detection.boundingBox, {
            color: "blue",
            lineWidth: 4,
            fillColor: "#00000000",
          });
          drawLandmarks(g, detection.landmarks, {
            color: "red",
            radius: 5,
          });
        }
        g.restore();
      });

      cameraController.initCamera();
    };
    setupFaceDetection();
    return () => {
      if (faceDetection) {
        faceDetection.close();
      }
    };
  }
}

export default AigenFaceDetect;
