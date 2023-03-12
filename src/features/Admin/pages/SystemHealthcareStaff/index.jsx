import DetailBookPatient from "features/Admin/features/BookManager/DetailBookPatient";
import CreateEditNews from "features/Admin/features/NewsManager/CreateEditNews";
import { Route, Routes } from "react-router-dom";
import Bookmanager from "../BookManager";
import NewsManager from "../NewsManager";

function SystemHealthcareStaff() {
    return (
        <>
            <Routes>
                <Route exact path="/newsmanager" element={<NewsManager />}></Route>
                <Route exact path="/newsmanager/create" element={<CreateEditNews />}></Route>
                <Route exact path="/newsmanager/edit/:id" element={<CreateEditNews />}></Route>
                <Route exact path="/bookmanager" element={<Bookmanager />}></Route>
                <Route exact path="/bookmanager/detail-patient/:id" element={<DetailBookPatient />}></Route>
            </Routes>
        </>
    )
}

export default SystemHealthcareStaff;