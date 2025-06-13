import { useRef, useEffect } from "react";
import styles from "./Camera.module.css";
import { BsCameraFill } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import clickSound from "./camera-click.mp3"; // Ensure you have this sound file

const Camera = ({ onCloseCamera, onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const audioRef = useRef(new Audio(clickSound));

  useEffect(() => {
    // Request camera access
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream; // Store the stream reference
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });

    return () => stopCamera(); // Ensure camera stops on unmount
  }, []);

  // Function to stop the camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop()); // Stop all tracks
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null; // Clear video source
      }
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Play camera click sound
      audioRef.current.currentTime = 0;
      audioRef.current.play();

      // Convert canvas to an image file
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "captured-image.jpg", {
            type: "image/jpeg",
          });
          onCapture(file); // Send file to parent component
          onCloseCamera(false);
        }
      }, "image/jpeg");

      // Stop the camera immediately after capture
      stopCamera();
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <video ref={videoRef} className={styles.video} autoPlay playsInline />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <div className={styles.btns}>
          <button className={styles.camera} onClick={captureImage}>
            <BsCameraFill />
          </button>
        </div>
      </div>
      <button
        className={styles.close}
        onClick={() => {
          stopCamera(); // Ensure camera stops when modal is closed
          onCloseCamera(false);
        }}
      >
        <MdOutlineClose />
      </button>
    </div>
  );
};

export default Camera;
