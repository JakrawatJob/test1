// สร้างไฟล์ MyComponent.js
"use client";
import React, { useState, useEffect } from "react";

const MyComponent = () => {
  const [message, setMessage] = useState("Hello from MyComponent!");
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    console.log("MyComponent did mount!");

    return () => {
      console.log("MyComponent will unmount!");
    };
  }, []);

  const handleClick = () => {
    setClickCount((prevClickCount) => prevClickCount + 1);
    setMessage(`Button Clicked ${clickCount + 1} times!`);
  };

  return (
    <div>
      <p>{clickCount}</p>
    </div>
  );
};

export default MyComponent;
