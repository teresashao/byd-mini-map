import { useState, useEffect } from 'react'; 

const Map = ({carPosition, worldXBoundary, worldZBoundary}) => {
    const [car, setCar] = useState([0,0]);
    const [dotSize, setDotSize] = useState('10%');

    const mapBoundarySize = 40; 
    const scale = Math.max(worldXBoundary, worldZBoundary) / mapBoundarySize; //would need 2 scales if not a square map 

    useEffect(() => {
        if (carPosition)
        {
            const [x, z] = carPosition;
            setCar([x,z]);
        }
      }, [carPosition]);

    const dotStyle = {
        position: 'absolute',
        bottom: `calc(50% + ${(car[1] / (scale*worldZBoundary)) * 50}%)`, // Adjust this based on the size of the dot
        left: `calc(50% + ${(car[0] /  (scale*worldXBoundary)) * 50}%)`,  // Adjust this based on the size of the dot
        maxHeight: dotSize, 
        maxWidth: dotSize, 
    };

    return (
        <div className="relative bg-white w-40 h-40 items-center justify-center">
            <p >{`x: ${car[0].toFixed(0)} z: ${car[1].toFixed(0)}`}</p>
            <img style={dotStyle} src="/black-dot.png"></img>
        </div>
    );
}
  
  export default Map;