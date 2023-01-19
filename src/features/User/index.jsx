import NotFound from "components/NotFound";
import { Route, Routes } from "react-router-dom";
import DoctorDetail from "./features/Home/SectionData/Doctor/DoctorDetail";
import SpecialtyDetail from "./features/Home/SectionData/Specialty/SpecialtyDetail";
import Contact from "./pages/Contact";
import Forum from "./pages/Forum";
import Home from "./pages/Home";
import News from "./pages/News";
import OnlExamination from "./pages/OnlExamination";

function HeathCare() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/online-examination" element={<OnlExamination />}></Route>
                <Route exact path="/forum" element={<Forum />}></Route>
                <Route exact path="/news" element={<News />}></Route>
                <Route exact path="/contact" element={<Contact />}></Route>
                <Route exact path="/detail-speacilty/:id" element={<SpecialtyDetail />}></Route>
                <Route exact path="/detail-doctor/:id" element={<DoctorDetail />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </>
    )
}

export default HeathCare;