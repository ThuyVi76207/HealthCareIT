import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { getUrlDynamic } from "../components/Auth";
import DenyUser from "./DenyUser";
import SystemAdmin from "./SystemAdmin";
import SystemDoctor from "./SystemDoctor";
import SystemHealthcareStaff from "./SystemHealthcareStaff";

const HomeManager = () => {

    const rolID = sessionStorage.getItem('role');
    const userProfile = JSON.parse(localStorage.getItem(`${rolID}`));

    console.log("Check roleID ", rolID);
    console.log("Check userProfile ", userProfile);

    let userUrl = getUrlDynamic(userProfile.roleId);

    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to={`/manager/system/${userUrl}/newsmanager`} />}></Route>
                <Route path="/admin/*" element={userProfile && userProfile.isLogin === true && <SystemAdmin />}></Route>
                <Route path="/doctor/*" element={userProfile && userProfile.isLogin === true && <SystemDoctor />}></Route>
                <Route path="/healthstaff/*" element={userProfile && userProfile.isLogin === true && <SystemHealthcareStaff />}></Route>
                <Route path="/user/newsmanager" element={<Navigate to={`/manager/system/user/not-permission`} />}></Route>
                <Route path="/user/not-permission" element={<DenyUser />}></Route>
            </Routes>
        </>
    )
}

export default HomeManager;