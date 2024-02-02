/// reponability:proess face
// regtiangle fce shape
// detect face
// return base 64
class aigenFaceProcessCanvas {
  cam;
  faceDetection;
  base64call;
  canvas;
  FaceDetected;
  constructor(widthCanvas, heightCanvas) {
    this.canvas = document.createElement("canvas");
    this.faceDetection = new FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`,
    });
    this.cam = new aigenFaceDetect(videoElement, {
      onFrame: async () => {
        await this.faceDetection.send({ image: videoElement });
        await new Promise((resolve) => setTimeout(resolve, 500));
      },

      width: widthCanvas,
      height: heightCanvas,
    });
    this.cam.start();
  }
  canvastobase64() {
    const context = this.canvas.getContext("2d");
    this.canvas.width = videoElement.videoWidth;
    this.canvas.height = videoElement.videoHeight;
    context.drawImage(
      videoElement,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.base64call = this.canvas.toDataURL("image/jpeg");
  }
  drawfaceshape = function (res) {
    const canvasDisplay = canvasElm.getContext("2d");
    const w = canvasElm.width;
    const h = canvasElm.height;
    canvasDisplay.save();
    if (mirrormode.checked) {
      canvasDisplay.scale(-1, 1);
      canvasDisplay.translate(-w, 0);
    }
    canvasDisplay.clearRect(0, 0, w, h);
    if (showimg.checked) {
      canvasDisplay.drawImage(res.image, 0, 0, w, h);
    }
    const canvas = document.createElement("canvas");
    canvas.width = res.image.width;
    canvas.height = res.image.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(res.image, 0, 0);
    if (res.detections.length > 0) {
      this.FaceDetected = true;
      drawRectangle(canvasDisplay, res.detections[0].boundingBox, {
        color: "red",
        lineWidth: 4,
        fillColor: "#00000000",
      });
      this.canvastobase64();
    } else {
      this.base64call = null; //cannot detect face
      this.FaceDetected = false;
      console.log("cannot detect face");
    }
    canvasDisplay.restore();
  };
  setImageModel() {
    this.faceDetection.setOptions({
      model: "short",
      minDetectionConfidence: 0.5,
    });
    this.faceDetection.onResults((res) => {
      //console.log("response");
      this.drawfaceshape(res);
    });
  }
}
