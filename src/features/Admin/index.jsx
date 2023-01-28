import NotFound from "components/NotFound";
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
                <Route exact path="/doctormanager" element={<DoctorManager />}></Route>
                <Route exact path="/planmanager" element={<PlanManager />}></Route>
                <Route exact path="/specialtymanager" element={<SpecialtyManager />}></Route>
                <Route exact path="/newsmanager" element={<NewsManager />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </>
    )
}

export default HealthManager;