import { useState, useEffect } from 'react'; 

const Map = ({carPosition}) => {
    const [car, setCar] = useState([0,0]);
    const [dotSize, setDotSize] = useState('10%');
    
    const boundarySize = 32; 

    useEffect(() => {
        if (carPosition)
        {
            const [x, z] = carPosition;
            if (x >= boundarySize && z >= boundarySize)
            {
                setDotSize('0%');
            }
            else if ((x <= boundarySize && z <= boundarySize))
            {
                setDotSize('10%');
            }
            setCar([x,z]);
        }
      }, [carPosition]);

    const dotStyle = {
        position: 'absolute',
        bottom: `calc(50% + ${(car[1] / 40) * 50}%)`, // Adjust this based on the size of the dot
        left: `calc(50% + ${(car[0] / 40) * 50}%)`,  // Adjust this based on the size of the dot
        maxHeight: dotSize, 
        maxWidth: dotSize
    };

    return (
        <div className="relative bg-white w-40 h-40 items-center justify-center">
            <p >{`x: ${car[0].toFixed(1)} z: ${car[1].toFixed(1)}`}</p>
            <img style={dotStyle} src="/black-dot.png"></img>
        </div>
    );
}
  
  export default Map;