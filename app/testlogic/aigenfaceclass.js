class aigenFaceDetect {
  constructor(videoElement, opt) {
    this.videoElement = videoElement;
    this.opt = opt;
    this.canvas = document.createElement("canvas");
  }
  async start() {
    const w = this.opt.width || 1280;
    const h = this.opt.height || 720;
    const video = {
      width: { ideal: w },
      height: { ideal: h },
    };
    const devs = await navigator.mediaDevices.enumerateDevices();
    console.log(devs);
    const tryToStart = async (dev) => {
      console.log("dev Find camera", dev);
      try {
        video.deviceId = dev.deviceId;
        const stream = await navigator.mediaDevices.getUserMedia({ video });
        this.videoElement.srcObject = stream;
        this.delay = 1000 / (this.opt.fps || 30);
        this.stream = stream;
        this.videoElement.playsInline = true;
        this.videoElement.autoplay = true;
        this.videoElement.play();
        this.active = true;
        this.endfunc = null;
        const f = async () => {
          if (!this.active) {
            if (this.endfunc) {
              this.endfunc();
            }
            return;
          }
          const v = this.videoElement;
          if (v.readyState == HTMLMediaElement.HAVE_ENOUGH_DATA) {
            await this.opt.onFrame();
          }
          setTimeout(f, this.delay);
        };
        f();
        return;
      } catch (e) {
        console.log(e);
      }
    };

    let devs2 = devs.filter((d) => {
      return d.kind == "videoinput";
    });
    if (devs2.length > 0) {
      console.log("filter", devs2);
      await tryToStart(devs2);
    }
  }
}
