class CameraController {
  constructor(videoRef, faceDetection) {
    this.videoRef = videoRef;
    this.faceDetection = faceDetection;
  }

  initCamera() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (this.videoRef) {
          this.videoRef.srcObject = stream;
          this.videoRef.play();
        }

        const onFrame = async () => {
          if (this.faceDetection) {
            await this.faceDetection.send({ image: this.videoRef });
            requestAnimationFrame(onFrame);
          }
        };
        onFrame();
      })
      .catch((error) => console.error("Error accessing camera:", error));
  }
}
export default CameraController;
