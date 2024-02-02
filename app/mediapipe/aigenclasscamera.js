class CameraController {
  constructor(videoRef, opt) {
    this.videoRef = videoRef;
    this.opt = opt;
  }

  initCamera() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (this.videoRef.current) {
          this.videoRef.current.srcObject = stream;
          this.videoRef.current.play();
        }

        const onFrameclass = this.opt;
        onFrameclass();
      })
      .catch((error) => console.error("Error accessing camera:", error));
  }
}
export default CameraController;
