import NotFound from "components/NotFound";
import AddEditInforDoctor from "./features/DoctorManager/AddEditInforDoctor";
import CreateEditNews from "./features/NewsManager/CreateEditNews";
import CreateEditSpecialty from "./features/SpecialtyManager/CreateEditSpecialty";
import CreateEditUser from "./features/UserManager/CreateEditUser";
import DoctorManager from "./pages/DoctorManager";
import HomeManager from "./pages/HomeManager";
import LoginAdmin from "./pages/LoginAdmin";
import MedicineManager from "./pages/MedicineManager";
import NewsManager from "./pages/NewsManager";
import PlanManager from "./pages/PlanManager";
import SpecialtyManager from "./pages/SpecialtyManager";
import SystemAdmin from "./pages/SystemAdmin";
import SystemDoctor from "./pages/SystemDoctor";
import UserManager from "./pages/UserManager";

const { Routes, Route } = require("react-router-dom");

function HealthManager() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<HomeManager />}></Route>
                <Route exact path="/login" element={<LoginAdmin />}></Route>

                <Route path="/system-admin/*" element={<SystemAdmin />}></Route>

                {/* Admin */}
                <Route exact path="/usermanager" element={<UserManager />}></Route>
                <Route exact path="/usermanager/create" element={<CreateEditUser />}></Route>
                <Route exact path="/usermanager/edit/:id" element={<CreateEditUser />}></Route>

                {/* Admin */}
                <Route exact path="/doctormanager" element={<DoctorManager />}></Route>
                <Route exact path="/doctormanager/add-information-doctor" element={<AddEditInforDoctor />}></Route>
                <Route exact path="/doctormanager/edit-information-doctor/:id" element={<AddEditInforDoctor />}></Route>

                {/* Doctor */}
                <Route path="/system-doctor/*" element={<SystemDoctor />}></Route>
                <Route exact path="/planmanager" element={<PlanManager />}></Route>

                {/* Admin */}
                <Route exact path="/specialtymanager" element={<SpecialtyManager />}></Route>
                <Route exact path="/specialtymanager/create" element={<CreateEditSpecialty />}></Route>
                <Route exact path="/specialtymanager/edit/:id" element={<CreateEditSpecialty />}></Route>

                {/* NVYT Admin Doctor */}
                <Route exact path="/newsmanager" element={<NewsManager />}></Route>
                <Route exact path="/newsmanager/create" element={<CreateEditNews />}></Route>
                <Route exact path="/newsmanager/edit/:id" element={<CreateEditNews />}></Route>

                <Route exact path="/medicinemanager" element={<MedicineManager />}></Route>


                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </>
    )
}

export default HealthManager;