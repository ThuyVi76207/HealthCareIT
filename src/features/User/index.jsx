import NotFound from "components/NotFound";
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import DoctorDetail from "./features/Home/SectionData/Doctor/DoctorDetail";
import NewsDetail from "./features/Home/SectionData/News/NewsDetail";
import SpecialtyDetail from "./features/Home/SectionData/Specialty/SpecialtyDetail";
import AnnounceVerify from "./pages/AnnounceVerify";
import BookingSchedule from "./pages/BookingSchedule";
import Contact from "./pages/Contact";
import Forum from "./pages/Forum";
import Home from "./pages/Home";
import LoginUser from "./pages/LoginUser";
import News from "./pages/News";
import OnlExamination from "./pages/OnlExamination";
import Register from "./pages/Register";
import VerifyBooking from "./pages/VerifyBooking";

function HeathCare() {

    const rolID = sessionStorage.getItem('role');
    const userProfile = JSON.parse(localStorage.getItem(`${rolID}`));

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/online-examination" element={<OnlExamination />}></Route>
                <Route exact path="/forum" element={<Forum />}></Route>
                <Route exact path="/news" element={userProfile && userProfile.isLogin === true ? <News /> : <Navigate to={'/healthcare/login/user'} />}></Route>
                <Route exact path="/contact" element={<Contact />}></Route>
                <Route exact path="/detail-speacilty/:id" element={<SpecialtyDetail />}></Route>
                <Route exact path="/detail-doctor/:id" element={<DoctorDetail />}></Route>
                <Route exact path="/detail-news/:id" element={userProfile && userProfile.isLogin === true ? <NewsDetail /> : <Navigate to={'/healthcare/login/user'} />}></Route>

                <Route exact path="/booking-schedule/:date/:time" element={<BookingSchedule />}></Route>

                <Route exact path="/register" element={<Register />}></Route>
                <Route exact path="/login/user" element={<LoginUser />}></Route>

                <Route exact path="/verify-booking" element={<VerifyBooking />}></Route>

                <Route exact path="/announce-verify-mail" element={<AnnounceVerify />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>

        </>
    )
}

export default HeathCare;