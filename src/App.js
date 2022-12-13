
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>



    // <Routes>
    //   <Route path="" element={<Home />}></Route>
    // </Routes>

  );
}

export default App;
