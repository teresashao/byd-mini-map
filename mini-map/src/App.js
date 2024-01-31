import React, { useState, useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';
import Scene from './components/Scene';
import Map from './components/Map';

const App = () => {
  const [carPosition, setCarPosition] = useState(null);

  function handlePositionData(data) {
    //console.log('Data received from child:', data);
    setCarPosition(data);
    //console.log(carPosition);
  }

  return(
    <div>
      <header className="relative items-center justify-center h-screen w-screen overflow-hidden">
        <Scene
          className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
          sendDataToParent={handlePositionData}
        />
        <div className="absolute top-10 right-10 p-4">
          {/* Content of the box */}
          <Map
            carPosition={carPosition}
            className="sticky top-0 right-0 z-20 w-1/4 h-1/4"
          />
        </div>
      </header>
    </div>

  );
};

export default App;