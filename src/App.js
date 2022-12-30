
import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NotFound from "components/NotFound";


const Healthcare = React.lazy(() => import("features/User/pages/Home"));

function App() {
  return (
    <div className="health-app">
      <Suspense fallback={<div>Loading ....</div>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to='/healthcare' />}></Route>
            <Route path="/healthcare/*" element={<Healthcare />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
      {/* <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes> */}
    </div>



    // <Routes>
    //   <Route path="" element={<Home />}></Route>
    // </Routes>

  );
}

export default App;
