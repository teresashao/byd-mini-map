import React, { useEffect, useState, useRef } from 'react';
import * as BABYLON from 'babylonjs';

const Scene = ({sendDataToParent, worldXBoundary, worldZBoundary}) => {
  const canvasRef = useRef(null);
  const [xPos, setXPos] = useState(0);
  const [zPos, setZPos] = useState(0);

  const sphereSteps = 1; 
  const maxXPos = worldXBoundary; 
  const maxZPos = worldZBoundary; 
  const resetXPos = 0; 
  const resetZPos = 0; 
  
  
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          sphere.position.z += sphereSteps;
          break;
        case 'ArrowDown':
          sphere.position.z -= sphereSteps;
          break;
        case 'ArrowLeft':
          sphere.position.x -= sphereSteps;
          break;
        case 'ArrowRight':
          sphere.position.x += sphereSteps;
          break;
        default:
          break;
      }
      // Check boundaries and reset if needed
      if (sphere.position.x >= maxXPos) {
        sphere.position.x = maxXPos;
      } else if (sphere.position.x <= -maxXPos) {
        sphere.position.x = -maxXPos;
      }
      if (sphere.position.z >= maxZPos) {
        sphere.position.z = maxZPos;
      } else if (sphere.position.z <= -maxZPos) {
        sphere.position.z = -maxZPos;
      }
      setXPos(sphere.position.x);
      setZPos(sphere.position.z);
    };

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

    /*scene.onBeforeRenderTargetsRenderObservable.add(() => {
        sphere.position.x += sphereSteps;
        sphere.position.z += sphereSteps;
        if (sphere.position.x >= maxXPos &&  sphere.position.z >= maxZPos)
        {
            sphere.position.x = resetXPos;
            sphere.position.z = resetZPos;
        }
        setXPos((prevXPos) => sphere.position.x);
        setZPos((prevZPos) => sphere.position.z);
    });*/
    window.addEventListener('keydown', handleKeyPress);

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });

    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      engine.dispose();
    };
  }, []);

  useEffect(() => {
    sendDataToParent([xPos, zPos]);
  }, [xPos, zPos]);

  return (<div>
    <canvas ref={canvasRef} className="w-screen h-screen overflow-hidden"/>
   
 </div>);
  
};

export default Scene;