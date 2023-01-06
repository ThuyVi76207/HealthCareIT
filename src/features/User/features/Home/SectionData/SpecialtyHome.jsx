import React, { useEffect, useState } from "react";
import { getAllSpecialty } from "services/userService";

function SpecialtyHome() {
    const [listSpecialty, setListSpecialty] = useState([])

    useEffect(() => {
        const printAllSpecialty = async () => {
            try {
                const res = await getAllSpecialty();
                // console.log(res);
                setListSpecialty(res.data);
            } catch (error) {
                console.log("Failed to get list Specialty: ", error);
            }
        }
        printAllSpecialty();

    }, []);
    console.log('List Specialty: ', listSpecialty);


    return (
        <div>

        </div>
    )
}

export default SpecialtyHome;