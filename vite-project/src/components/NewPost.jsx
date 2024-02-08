import React from "react";
import * as faceapi from "face-api.js";
import { useRef, useEffect } from "react";

const NewPost = () => {
    const imgRef = useRef();
    const canvasRef = useRef();

    const handleImage = async () => {
        const detections = await faceapi.detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions());
        setFaces(detections.map((d) => Object.values(d.box)));
    };

    useEffect(() => {
        const loadModels = () => {
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                faceapi.nets.faceExpressionNet.loadFromUri("/models"),
            ])
                .then(handleImage)
                .catch((e) => console.log(e));
        };

        imgRef.current && loadModels();
    }, []);

    return (
        <div>
            <img
                src="https://images.pexels.com/photos/9371782/pexels-photo-9371782.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="avatar"
            />

            <canvas width="940" height="650" />
        </div>
    );
};

export default NewPost;
