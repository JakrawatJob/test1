import { FaceDetection } from "@mediapipe/face_detection/face_detection";
import {
  drawLandmarks,
  drawRectangle,
} from "@mediapipe/drawing_utils/drawing_utils";
class AIGenFaceDetect {
  faceDetectionModule;
  base64;
  base64array = { turnleft: [], turnright: [], lookdown: [], lookup: [] };
  randomAction = {
    check: true,
    list: -1,
    actions: ["Turn left", "Turn right", "Look up", "Look down", "Complete"],
  };

  typeface;
  constructor() {}
  initFaceDetection(canvas, refvideo) {
    this.faceDetectionModule = new FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`,
    });
    this.faceDetectionModule.setOptions({
      model: "short",
      minDetectionConfidence: 0.5,
    });
    if (this.randomAction.check && this.randomAction.list == -1) {
      this.shuffleArrayOnce(this.randomAction.actions);
      this.randomAction.list = 0;
    }

    this.faceDetectionModule.onResults((res) => {
      const w = canvas.width;
      const h = canvas.height;
      const g = canvas.getContext("2d");

      g.drawImage(refvideo, 0, 0, w, h);

      g.save();
      g.clearRect(0, 0, w, h);

      if (res.detections.length > 0) {
        if (this.randomAction.list == this.randomAction.actions.length - 1) {
          this.randomAction.check = false;
        }
        //console.log("randomAction", this.randomAction);
        const detection = res.detections[0];
        //xcen = detection.boundingBox.xCenter;
        //ycen = detection.boundingBox.yCenter;
        g.drawImage(
          res.image,
          (detection.boundingBox.xCenter -
            0.02 -
            detection.boundingBox.width / 2) *
            w,
          (detection.boundingBox.yCenter -
            0.1 -
            detection.boundingBox.height / 2) *
            h,
          (detection.boundingBox.width + 0.04) * w,
          (detection.boundingBox.height + 0.12) * h,
          0,
          0,
          w,
          h
        );
        const base64call = canvas.toDataURL("image/jpeg");
        this.base64 = base64call;
        //console.log(detection.boundingBox.height/2, detection.boundingBox.width);
        // drawRectangle(g, detection.boundingBox, {
        //   color: "blue",
        //   lineWidth: 4,
        //   fillColor: "#00000000",
        // });
        // drawLandmarks(g, detection.landmarks, {
        //   color: "red",
        //   radius: 5,
        // });
        if (detection.landmarks) {
          const leftEyeLandmark = detection.landmarks[1].x;
          const leftearLandmark = detection.landmarks[5].x;
          const rightEyeLandmark = detection.landmarks[0].x;
          const rightearLandmark = detection.landmarks[4].x;
          const factor = 0.01;
          this.typeface = "Normal";

          if (rightEyeLandmark - rightearLandmark < factor) {
            this.handleTurn(
              "Turn right",
              this.base64array.turnright,
              base64call,
              this.randomAction
            );
          } else if (leftearLandmark - leftEyeLandmark < factor) {
            this.handleTurn(
              "Turn left",
              this.base64array.turnleft,
              base64call,
              this.randomAction
            );
          } else if (
            detection.landmarks[1].y -
              (detection.landmarks[5].y + detection.landmarks[4].y) / 2 >
            factor
          ) {
            this.handleTurn(
              "Look down",
              this.base64array.lookdown,
              base64call,
              this.randomAction
            );
          } else if (
            detection.landmarks[2].y -
              (detection.landmarks[5].y + detection.landmarks[4].y) / 2 <
            factor
          ) {
            this.handleTurn(
              "Look up",
              this.base64array.lookup,
              base64call,
              this.randomAction
            );
          }
        }
      }
    });
  }
  shuffleArrayOnce(array) {
    for (let i = array.length - 2; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
      break;
    }
  }
  handleTurn(type, array, base64call, randomAction) {
    if (
      randomAction.actions[randomAction.list] == type ||
      !randomAction.check
    ) {
      //console.log(randomAction);

      array.push(base64call);
      this.typeface = type;

      if (array.length > 10) {
        //console.log(randomAction.list);
        if (randomAction.actions.length - 2 >= randomAction.list) {
          randomAction.list += 1;
        }
        let poppedElement = array.shift();
      }
    }
  }
  getbase64data(callback) {
    callback(this.base64array, this.typeface);
  }
}

export default AIGenFaceDetect;
