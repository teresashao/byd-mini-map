import { useState, useEffect } from 'react'; 

const Map = ({carPosition, worldPosXBound, worldNegXBound, worldPosZBound, worldNegZBound, fixedHeight}) => {
    const [car, setCar] = useState([0,0]);
    const [dotSize, setDotSize] = useState('10%');

    const mapBoundarySize = 40; 
    const xSpan = Math.abs(worldPosXBound-worldNegXBound);
    const zSpan = Math.abs(worldPosZBound-worldNegZBound);
    const map_width = `${xSpan/zSpan *fixedHeight}rem`;
    const map_height = `${fixedHeight}rem`;
    const center_x = (Math.abs(worldNegXBound)/xSpan) *100; 
    const center_z = (Math.abs(worldNegZBound)/zSpan) *100
    useEffect(() => {
        if (carPosition)
        {
            const [x, z] = carPosition;
            setCar([x,z]);
        }
      }, [carPosition]);

    const dotStyle = {
        position: 'absolute',
        transform: 'translate(-50%, 50%)',
        bottom: `calc(${center_z}% + ${(car[1] / (zSpan/2)) * 50}%)`,
        left: `calc(${center_x}% + ${(car[0] /  (xSpan/2)) * 50}%)`, 
        maxHeight: dotSize, 
        maxWidth: dotSize 
    };
    const mapSize = {
        height: map_height, 
        width: map_width
    };
    return (
        <div className="relative bg-white items-center w-40 h-40 justify-center" style={mapSize}>
            <p >{`x: ${car[0].toFixed(0)} z: ${car[1].toFixed(0)}`}</p>
            <img style={dotStyle} src="/black-dot.png"></img>
        </div>
    );
}
  
  export default Map;