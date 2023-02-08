import NotFound from "components/NotFound";
import AddInforDoctor from "./features/DoctorManager/AddInforDoctor";
import CreateEditNews from "./features/NewsManager/CreateEditNews";
import CreateEditSpecialty from "./features/SpecialtyManager/CreateEditSpecialty";
import CreateEditUser from "./features/UserManager/CreateEditUser";
import DoctorManager from "./pages/DoctorManager";
import HomeManager from "./pages/HomeManager";
import NewsManager from "./pages/NewsManager";
import PlanManager from "./pages/PlanManager";
import SpecialtyManager from "./pages/SpecialtyManager";
import UserManager from "./pages/UserManager";

const { Routes, Route } = require("react-router-dom");

function HealthManager() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<HomeManager />}></Route>

                <Route exact path="/usermanager" element={<UserManager />}></Route>
                <Route exact path="/usermanager/create" element={<CreateEditUser />}></Route>
                <Route exact path="/usermanager/edit/:id" element={<CreateEditUser />}></Route>

                <Route exact path="/doctormanager" element={<DoctorManager />}></Route>
                <Route exact path="/doctormanager/add-information-doctor" element={<AddInforDoctor />}></Route>

                <Route exact path="/planmanager" element={<PlanManager />}></Route>
                <Route exact path="/specialtymanager" element={<SpecialtyManager />}></Route>
                <Route exact path="/specialtymanager/create" element={<CreateEditSpecialty />}></Route>
                <Route exact path="/specialtymanager/edit/:id" element={<CreateEditSpecialty />}></Route>


                <Route exact path="/newsmanager" element={<NewsManager />}></Route>
                <Route exact path="/newsmanager/create" element={<CreateEditNews />}></Route>
                <Route exact path="/newsmanager/edit/:id" element={<CreateEditNews />}></Route>

                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </>
    )
}

export default HealthManager;