import React, {useState, useRef, useEffect} from 'react'; 
import {select} from "d3"; 
import './App.css';

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20]); 
  const svgRef = useRef(); 

  useEffect(() => {
    const svg = select (svgRef.current);
    svg.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", value => 1)
    .attr("cx", value => value *2)
    .attr("cy", value => value *2)
    .attr("stroke", "red");
  }, [data]);

  return (
    <div className="">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default App;
