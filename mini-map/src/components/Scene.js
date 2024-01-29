import React, { useEffect, useState, useRef } from 'react';
import * as BABYLON from 'babylonjs';

const Scene = ({sendDataToParent}) => {
  const canvasRef = useRef(null);
  const [xPos, setXPos] = useState(0);
  const [zPos, setZPos] = useState(0);

  useEffect(() => {
    // Initialize Babylon scene
    const engine = new BABYLON.Engine(canvasRef.current, true);
    const scene = new BABYLON.Scene(engine);
    // Creates and positions a free camera
    const camera = new BABYLON.FreeCamera("camera1", 
        new BABYLON.Vector3(0, 5, -10), 
        scene);
    // Targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // Attaches the camera to the canvas
    const canvas = document.getElementById("renderCanvas"); // Get the canvas element
    camera.attachControl(canvas, true);
    // Creates a light, aiming 0,1,0
    const light = new BABYLON.HemisphericLight("light", 
        new BABYLON.Vector3(0, 1, 0), 
        scene);
    // Dim the light a small amount 0 - 1
    light.intensity = 0.7;
    // Run the render loop

    // Built-in 'sphere' shape.
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", 
        {diameter: 2, segments: 32}, 
        scene);

    //set initial states 
    sphere.position.y=1; 
    // Built-in 'ground' shape.
    const ground = BABYLON.MeshBuilder.CreateGround("ground", 
        {width: 6, height: 6}, 
        scene);

    scene.onBeforeRenderTargetsRenderObservable.add(() => {
        sphere.position.x += 0.01;
        sphere.position.z += 0.01;
        if (sphere.position.x >=5 &&  sphere.position.z >=5)
        {
            sphere.position.x = -1;
            sphere.position.z = -1;
        }
        setXPos((prevXPos) => sphere.position.x);
        setZPos((prevZPos) => sphere.position.z);
    });

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      engine.resize();
    });

    // Clean up
    return () => {
      engine.dispose();
    };
  }, []);

  useEffect(() => {
    sendDataToParent([xPos, zPos]);
    //console.log("Updated xPos:", xPos);
    //console.log("Updated zPos:", zPos);
  }, [xPos, zPos]);

  return <canvas ref={canvasRef} className="w-screen h-screen overflow-hidden"/>;
};

export default Scene;