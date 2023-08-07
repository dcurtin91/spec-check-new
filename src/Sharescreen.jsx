import React, { useState, useEffect, useRef } from "react";

import "./App.css";

const ShareScreen = () => {
  const canvasRef = useRef(null);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  useEffect(() => {
    if (!clicked) {
      return;
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices
        .getDisplayMedia({ audio: true })
        .then(process)
        .catch((error) => {
          console.log("bad");
        });
    } else {
      console.log("badder");
    }

    function process(stream) {
      const CVS = canvasRef.current;
      const CTX = CVS.getContext("2d", { willReadFrequently: true });
      const W = 650;
      const H = 325;

      const ACTX = new (window.AudioContext || window.webkitAudioContext)();
      const ANALYSER = ACTX.createAnalyser();
      ANALYSER.fftSize = 4096;
      const SOURCE = ACTX.createMediaStreamSource(stream);
      SOURCE.connect(ANALYSER);

      const DATA = new Uint8Array(ANALYSER.frequencyBinCount);
      const LEN = DATA.length;
      const h = H / LEN;
      const x = W - 1;
      CTX.fillStyle = "hsl(280, 100%, 10%)";
      CTX.fillRect(0, 0, W, H);

      loop();

      function loop() {
        window.requestAnimationFrame(loop);
        let imgData = CTX.getImageData(1, 0, W - 1, H);
        CTX.putImageData(imgData, 0, 0);
        ANALYSER.getByteFrequencyData(DATA);
        for (let i = 0; i < LEN; i++) {
          let rat = DATA[i] / 255;
          let hue = Math.round(rat * 120 + (280 % 360));
          let sat = "100%";
          let lit = 10 + 70 * rat + "%";
          CTX.beginPath();
          CTX.strokeStyle = `hsl(${hue}, ${sat}, ${lit})`;
          CTX.moveTo(x, H - i * h);
          CTX.lineTo(x, H - (i * h + h));
          CTX.stroke();
        }
      }
    }
  }, [clicked]);

  return (
    <div>
      <h2 style={{ marginTop: "30px" }}>Audio from Your Browser</h2>
      <div className="sharescreen">
        Open a separate tab and begin playing music via your preferred streaming
        service.<br></br>
        Select the "Share Screen" button below, then choose the tab that is
        playing audio.<br></br>
        The spectrogram will then visualize the audio that's playing in the tab
        you selected.<br></br>
        (This works best on Google Chrome.)
      </div>
      <div>
        <button className="sharebutton" onClick={handleClick}>
          Share Screen
        </button>
        <canvas
          ref={canvasRef}
          className="visualizer"
          width="650"
          height="325"
        />
      </div>
    </div>
  );
};

export { ShareScreen };
