import AddEditInforDoctor from "features/Admin/features/DoctorManager/AddEditInforDoctor";
import CreateEditNews from "features/Admin/features/NewsManager/CreateEditNews";
import CreateEditSpecialty from "features/Admin/features/SpecialtyManager/CreateEditSpecialty";

import { Route, Routes } from "react-router-dom";
import DoctorManager from "../DoctorManager";
import NewsManager from "../NewsManager";
import PlanManager from "../PlanManager";
import SpecialtyManager from "../SpecialtyManager";
import StatisticsBooking from "../StatisticsBooking";
import CommentManager from "../CommentManager";

function SystemAdmin() {
  return (
    <>
      <Routes>
        {/* <Route exact path="/usermanager" element={<UserManager />}></Route>
        <Route
          exact
          path="/usermanager/create"
          element={<CreateEditUser />}
        ></Route>
        <Route
          exact
          path="/usermanager/edit/:id"
          element={<CreateEditUser />}
        ></Route> */}

        <Route exact path="/doctormanager" element={<DoctorManager />}></Route>
        <Route
          exact
          path="/doctormanager/add-information-doctor"
          element={<AddEditInforDoctor />}
        ></Route>
        <Route
          exact
          path="/doctormanager/edit-information-doctor/:id"
          element={<AddEditInforDoctor />}
        ></Route>

        <Route
          exact
          path="/specialtymanager"
          element={<SpecialtyManager />}
        ></Route>
        <Route
          exact
          path="/specialtymanager/create"
          element={<CreateEditSpecialty />}
        ></Route>
        <Route
          exact
          path="/specialtymanager/edit/:id"
          element={<CreateEditSpecialty />}
        ></Route>

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

        <Route exact path="/planmanager" element={<PlanManager />}></Route>

        <Route
          exact
          path="/statistics-booking"
          element={<StatisticsBooking />}
        ></Route>

        <Route
          exact
          path="/comment-manager"
          element={<CommentManager />}
        ></Route>
        {/* <Route
          exact
          path="/comment-manager/edit/:id"
          element={<EditComment />}
        ></Route> */}
      </Routes>
    </>
  );
}

export default SystemAdmin;
