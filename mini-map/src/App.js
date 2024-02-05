import React, { useState, useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';
import Scene from './components/Scene';
import Map from './components/Map';

const App = () => {
  const [carPosition, setCarPosition] = useState(null);

  //custom world and map specs
  const worldPosXBound = 3;
  const worldNegXBound = -2;
  const worldPosZBound = 4;
  const worldNegZBound = -10;
  const fixedHeight = 10; 
  
  function handlePositionData(data) {
    setCarPosition(data);
  }

  return(
    <div>
      <header className="relative items-center justify-center h-screen w-screen overflow-hidden">
        <Scene
          className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
          sendDataToParent={handlePositionData}
          worldPosXBound= {worldPosXBound}
          worldNegXBound= {worldNegXBound}
          worldPosZBound= {worldPosZBound}
          worldNegZBound= {worldNegZBound}
        />
        <div className="absolute top-10 right-10 p-4">
          <Map
            carPosition={carPosition}
            worldPosXBound= {worldPosXBound}
            worldNegXBound= {worldNegXBound}
            worldPosZBound= {worldPosZBound}
            worldNegZBound= {worldNegZBound}
            fixedHeight = {fixedHeight}
            className="sticky top-0 right-0 z-20" 
          />
        </div>
      </header>
    </div>

  );
};

export default App;