import { FaceDetection } from "@mediapipe/face_detection/face_detection";
import {
  drawLandmarks,
  drawRectangle,
} from "@mediapipe/drawing_utils/drawing_utils";
class AIGenFaceDetect {
  faceDetectionModule;
  base64;
  constructor() {}

  initFaceDetection(canvas, refvideo, mirrormode, showimg, base64array) {
    this.faceDetectionModule = new FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`,
    });
    this.faceDetectionModule.setOptions({
      model: "short",
      minDetectionConfidence: 0.5,
    });

    this.faceDetectionModule.onResults((res) => {
      const w = canvas.width;
      const h = canvas.height;
      const g = canvas.getContext("2d");

      g.drawImage(refvideo, 0, 0, w, h);
      const base64call = canvas.toDataURL("image/jpeg");
      this.base64 = base64call;
      g.save();
      if (mirrormode && w > 0) {
        g.scale(-1, 1);
        g.translate(-w, 0);
      }
      g.clearRect(0, 0, w, h);
      showimg && g.drawImage(res.image, 0, 0, w, h);

      if (res.detections.length > 0) {
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
        if (detection.landmarks) {
          const leftEyeLandmark = detection.landmarks[1].x;
          const leftearLandmark = detection.landmarks[5].x;
          const rightEyeLandmark = detection.landmarks[0].x;
          const rightearLandmark = detection.landmarks[4].x;

          if (rightEyeLandmark - rightearLandmark < 0.02) {
            base64array.turnright.push(base64call);
            if (base64array.turnright.length > 10) {
              let poppedElement = base64array.turnright.shift();
            }
          }
          if (leftearLandmark - leftEyeLandmark < 0.02) {
            base64array.turnleft.push(base64call);
            if (base64array.turnleft.length > 10) {
              let poppedElement2 = base64array.turnleft.shift();
            }
          }
        }
      }
    });
  }
}

export default AIGenFaceDetect;
