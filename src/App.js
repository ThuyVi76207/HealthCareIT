
import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import NotFound from "components/NotFound";
import Loading from "components/Loading/loading";


const HealthCare = React.lazy(() => import("features/User"));

function App() {
  return (
    <div className="health-app">
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to='/healthcare' />}></Route>
            <Route path="/healthcare/*" element={<HealthCare />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
