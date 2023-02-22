import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { getUrlDynamic } from "../components/Auth";
import SystemAdmin from "./SystemAdmin";
import SystemDoctor from "./SystemDoctor";
import SystemHealthcareStaff from "./SystemHealthcareStaff";

const HomeManager = () => {
    const userProfile = useSelector((state) => state.profileuser)
    let userUrl = getUrlDynamic(userProfile.roleId);

    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to={`/manager/system/${userUrl}/newsmanager`} />}></Route>
                <Route path="/admin/*" element={userProfile && userProfile.isLogin === true && <SystemAdmin />}></Route>
                <Route path="/doctor/*" element={userProfile && userProfile.isLogin === true && <SystemDoctor />}></Route>
                <Route path="/healthstaff/*" element={userProfile && userProfile.isLogin === true && <SystemHealthcareStaff />}></Route>
            </Routes>
        </>
    )
}

export default HomeManager;