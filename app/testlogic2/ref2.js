// Mock Camera class for demonstration purposes
class Camera {
  constructor(videoElement) {
    this.videoElement = videoElement;
  }

  setProcess(process) {
    this.process = process;
  }

  open() {
    // Mocking camera opening
    console.log("Camera opened");
    this.startProcessing();
  }

  startProcessing() {
    // Mocking video stream processing
    setInterval(() => {
      const fakeBase64Data = "fakeBase64Data";
      this.process(fakeBase64Data);
    }, 1000);
  }
}

// Mock FaceDetect class for demonstration purposes
class FaceDetect {
  process(callback) {
    // Mocking face detection process
    console.log("Face detected");
    callback("fakeBase64Data");
  }
}

const videoElement = document.getElementById("videoElement");
const camera = new Camera(videoElement);

// FR Utilities
const faceDetect = new FaceDetect();

camera.setProcess(faceDetect);
camera.open();

function callback(base64) {
  // Call your API or perform additional processing here
  // For example, let's log the base64 data to the console
  console.log(base64);

  // You can return any value you want or perform further actions
  return "xxx";
}

faceDetect.process(callback);
