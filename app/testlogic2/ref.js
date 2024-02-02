const videoElement = document.getElementById("videoElement
const camera = new Camera(videoElement)

// FR Utilities

const faceDetect = new FaceDetect()


camera.setProcess(faceDetect)
camera.open()

function callback(base64) {
    // call API 
    return "xxx" 
}

faceDetect.process(callback)
