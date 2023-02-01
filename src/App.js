import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import NotFound from "components/NotFound";
import AlertBoxSection from "components/Alert/AlertBoxSection";

const HealthCare = React.lazy(() => import("features/User"));
const HealthManager = React.lazy(() => import("features/Admin"));

function App() {
  return (
    <div className="health-app">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to='/healthcare' />}></Route>
            <Route path="/healthcare/*" element={<HealthCare />}></Route>
            <Route path="/manager/*" element={<HealthManager />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
        <AlertBoxSection />
      </Suspense>
    </div>
  );
}

export default App;
