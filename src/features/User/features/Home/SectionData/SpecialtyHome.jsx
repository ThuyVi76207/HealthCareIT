import React from "react";
import { getAllSpecialty } from "services/userService";

function SpecialtyHome() {

    let res = getAllSpecialty();

    console.log(res);




    return (
        <div>
            Specialty
        </div>
    )
}

export default SpecialtyHome;