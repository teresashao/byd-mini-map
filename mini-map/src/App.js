import React, {useState, useRef, useEffect} from 'react'; 
import {select, line, curveCardinal} from "d3"; 
import './App.css';

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20]); 
  const svgRef = useRef(); 

  useEffect(() => {
    const svg = select (svgRef.current);
    const carPath = line()
      .x((value, index) => index * 50)
      .y(value => 150-value)
      .curve(curveCardinal)
    
    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", value => carPath(value))
      .attr("fill", "none")
      .attr("stroke", "blue")
    /*svg.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", value => 1)
    .attr("cx", value => value *2)
    .attr("cy", value => value *2)
    .attr("stroke", "red");
    */
  }, [data]);

  return (
    <div className="">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default App;
