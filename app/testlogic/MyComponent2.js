// สร้างไฟล์ MyComponent.js
"use client";
import MyComponent1 from "./MyComponent";
import React, { useState, useEffect } from "react";

const MyComponent = () => {
  let data1 = MyComponent1.message;
  useEffect(() => {
    console.log("MyComponent did mount2", data1);

    return () => {
      console.log("MyComponent will unmount2");
    };
  }, []);

  return <MyComponent1 />;
};

export default MyComponent;
