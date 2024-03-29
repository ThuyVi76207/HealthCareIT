import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import NotFound from "components/NotFound";
import AlertBoxSection from "components/Alert/AlertBoxSection";
import * as process from "process";
import DialogModal from "components/Modal/DialogModal";
import SendIDModal from "components/Modal/SendIDModal";
import PaymentSuccessPayPal from "features/User/features/PaymentMenthod/PaymentSuccessPayPal";
import PaymentSuccessVnPay from "features/User/features/PaymentMenthod/PaymentSuccessVnPay";

const HealthCare = React.lazy(() => import("features/User"));
const HealthManager = React.lazy(() => import("features/Admin"));

function App() {
  window.global = window;
  window.process = process;
  window.Buffer = [];
  return (
    <div className="health-app">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/healthcare" />}></Route>
            <Route path="/healthcare/*" element={<HealthCare />}></Route>
            <Route path="/manager/*" element={<HealthManager />}></Route>
            <Route
              exact
              path="/success"
              element={<PaymentSuccessPayPal />}
            ></Route>
            <Route
              path="/vnpay_return"
              element={<PaymentSuccessVnPay />}
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
        <AlertBoxSection />
        <DialogModal />
        <SendIDModal />
      </Suspense>
    </div>
  );
}

export default App;
