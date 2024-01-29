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
    <div className="relative">
      <Scene sendDataToParent={handlePositionData}/>
      <Map></Map>
    </div>
  );
};

export default App;