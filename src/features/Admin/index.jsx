import NotFound from "components/NotFound";
import HomeManager from "./pages/HomeManager";
import LoginAdmin from "./pages/LoginAdmin";
import MedicineManager from "./pages/MedicineManager";
import RoomVideo from "./pages/RoomVideo";

const { Routes, Route, Navigate } = require("react-router-dom");

function HealthManager() {

    return (
        <>
            <Routes>
                <Route exact path="/" element={<Navigate to='/manager/login' />}></Route>
                <Route exact path="/login" element={<LoginAdmin />}></Route>
                <Route path="/system/*" element={<HomeManager />}></Route>
                <Route exact path="/room-video" element={<RoomVideo />}></Route>

                {/* Admin */}
                {/* <Route exact path="/usermanager" element={<UserManager />}></Route>
                <Route exact path="/usermanager/create" element={<CreateEditUser />}></Route>
                <Route exact path="/usermanager/edit/:id" element={<CreateEditUser />}></Route> */}

                {/* Admin */}
                {/* <Route exact path="/doctormanager" element={<DoctorManager />}></Route>
                <Route exact path="/doctormanager/add-information-doctor" element={<AddEditInforDoctor />}></Route>
                <Route exact path="/doctormanager/edit-information-doctor/:id" element={<AddEditInforDoctor />}></Route> */}

                {/* Doctor */}

                {/* <Route exact path="/planmanager" element={<PlanManager />}></Route> */}

                {/* Admin */}
                {/* <Route exact path="/specialtymanager" element={<SpecialtyManager />}></Route>
                <Route exact path="/specialtymanager/create" element={<CreateEditSpecialty />}></Route>
                <Route exact path="/specialtymanager/edit/:id" element={<CreateEditSpecialty />}></Route> */}

                {/* NVYT Admin Doctor */}

                {/*
                <Route exact path="/newsmanager" element={<NewsManager />}></Route>
                <Route exact path="/newsmanager/create" element={<CreateEditNews />}></Route>
                <Route exact path="/newsmanager/edit/:id" element={<CreateEditNews />}></Route> */}

                <Route exact path="/medicinemanager" element={<MedicineManager />}></Route>


                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </>
    )
}

export default HealthManager;