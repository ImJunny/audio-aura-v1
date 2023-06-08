import React from "react";
import { useEffect, useState } from "react";

//randomizer functions
function randomPos() {
  return Math.random() * (window.innerHeight - 100) - 200;
}
function randomSize() {
  return Math.floor(Math.random() * 1000) + 100;
}

function Shape({ color }) {
  //states
  const [position, setPosition] = useState({
    top: randomPos(),
    left: randomPos(),
  });
  const [size, setSize] = useState({
    height: randomSize(),
    width: randomSize(),
  });

  //useEffect on state changes
  useEffect(() => {
    function changePos() {
      const newPosition = { top: randomPos(), left: randomPos() };
      setPosition(newPosition);
    }

    function changeSize() {
      const newSize = {
        width: randomSize(),
        height: randomSize(),
      };
      setSize(newSize);
    }

    const intervalId1 = setInterval(changePos, 12000);
    const intervalId2 = setInterval(changeSize, 6000);

    return () => {
      clearInterval(intervalId1);
      clearInterval(intervalId2);
    };
  }, []);

  const componentStyle = {
    position: "fixed",
    top: `${position.top}px`,
    left: `${position.left}px`,
    transition: "top 16s, left 16s, width 7s, height 7s",
    height: `${size.height}px`,
    width: `${size.width}px`,
    backgroundColor: `${color}`,
    borderRadius: "50%",
  };

  return <div style={componentStyle}></div>;
}

export default Shape;
