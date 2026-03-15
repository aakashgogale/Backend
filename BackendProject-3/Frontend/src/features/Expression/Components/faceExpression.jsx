import React, { useRef, useEffect, useState } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';
import * as cam from '@mediapipe/camera_utils';
import Webcam from 'react-webcam';

const FaceGestureDetector = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [emotion, setEmotion] = useState("Detecting...");

  // Euclidean Distance Formula
  const getDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };

  const onResults = (results) => {
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
      const landmarks = results.multiFaceLandmarks[0];

      // Points: 13 (Upper Lip), 14 (Lower Lip), 61 (Left Corner), 291 (Right Corner)
      const mouthOpen = getDistance(landmarks[13], landmarks[14]);
      const mouthWidth = getDistance(landmarks[61], landmarks[291]);
      const eyeHeight = getDistance(landmarks[159], landmarks[145]); // Left Eye open/close

      let detectedEmotion = "Neutral 😐";

      if (mouthOpen > 0.05) {
        detectedEmotion = "Surprised! 😲";
      } else if (mouthWidth > 0.12) {
        detectedEmotion = "Happy! 😊";
      } else if (mouthOpen < 0.0001 && mouthWidth < 0.0001) {
        detectedEmotion = "Sad ☹️";
      }

      setEmotion(detectedEmotion);

      // Drawing on Canvas (Optional)
      const canvasElement = canvasRef.current;
      const canvasCtx = canvasElement.getContext("2d");
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      // Aap yahan landmarks draw bhi kar sakte hain agar chahein
    }
  };

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults(onResults);

    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
      const camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <h1>Emotion: {emotion}</h1>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 10,
          width: 640,
          height: 480,
        }}
      />
      
    </div>
  );
};

export default FaceGestureDetector;