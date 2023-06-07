import CreateEditNews from "features/Admin/features/NewsManager/CreateEditNews";
import { Route, Routes } from "react-router-dom";
import NewsManager from "../NewsManager";
import PatientManager from "../PatientManager";
import PlanManager from "../PlanManager";
import StatisticsBooking from "../StatisticsBooking";

function SystemDoctor() {
  return (
    <>
      <Routes>
        <Route exact path="/planmanager" element={<PlanManager />}></Route>

        <Route exact path="/newsmanager" element={<NewsManager />}></Route>
        <Route
          exact
          path="/newsmanager/create"
          element={<CreateEditNews />}
        ></Route>
        <Route
          exact
          path="/newsmanager/edit/:id"
          element={<CreateEditNews />}
        ></Route>

        <Route
          exact
          path="/patientmanager"
          element={<PatientManager />}
        ></Route>

        <Route
          exact
          path="/statistics-booking"
          element={<StatisticsBooking />}
        ></Route>
      </Routes>
    </>
  );
}
export default SystemDoctor;
