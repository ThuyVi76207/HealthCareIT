import React, { useEffect, useState } from "react";
import { getProfileDoctorById } from "services/userService";
import './ProfileDoctorStyles.scss';
import ''

const ProfileDoctor = ({ id }) => {

    const [profileDoctorId, setProfileDoctorId] = useState({})

    useEffect(() => {
        const printProfileDoctor = async () => {
            try {
                const resProfile = await getProfileDoctorById(id);
                console.log(resProfile.data);
            } catch (err) {
                console.log('Failed to get profile doctor', err);
            }
        }

        printProfileDoctor();
    }, [id])

    return (
        <div className="card-profile">
            <div className="card-profile__left">
                <div>
                    <img />
                    <button>Xem them</button>
                </div>
                <div></div>
            </div>
            <div className="card-profile__right"></div>
        </div>
    )
}

export default ProfileDoctor