import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProfileDoctorById } from "services/userService";
import './ProfileDoctorStyles.scss';

const ProfileDoctor = ({ id }) => {

    const [profileDoctorId, setProfileDoctorId] = useState({});
    const { language } = useSelector((state) => state.user) || {};

    useEffect(() => {
        const printProfileDoctor = async () => {
            try {
                const resProfile = await getProfileDoctorById(id);
                console.log(resProfile.data);
                setProfileDoctorId(resProfile.data);
            } catch (err) {
                console.log('Failed to get profile doctor', err);
            }
        }

        printProfileDoctor();
    }, [id])

    let nameVi = '', nameEn = '';
    if (profileDoctorId && profileDoctorId.positionData) {
        nameVi = `${profileDoctorId.positionData.value_Vi}, ${profileDoctorId.lastName} ${profileDoctorId.firstName}`;
        nameEn = `${profileDoctorId.positionData.value_En}, ${profileDoctorId.firstName} ${profileDoctorId.lastName}`;
    }

    let locationVI = '', locationEn = '';
    if (profileDoctorId && profileDoctorId.Doctor_Infor && profileDoctorId.Doctor_Infor.provinceTypeData) {
        locationVI = profileDoctorId.Doctor_Infor.provinceTypeData.value_Vi;
        locationEn = profileDoctorId.Doctor_Infor.provinceTypeData.value_En;
    }

    console.log('Check location', locationVI, locationEn)

    return (
        <div className="card-profile">
            <div className="card-profile__left">
                <div className="w-[20%] mr-2">
                    <img className="w-[110px] h-[110px] rounded-[50%]" src={profileDoctorId.image} alt="" />
                    <button>Xem them</button>
                </div>
                <div className="w-[80%]">
                    <h2 className="text-[#16917c] text-[20px] font-bold my-1">{language === 'vi' ? nameVi : nameEn}</h2>
                    {
                        profileDoctorId &&
                        profileDoctorId.Markdown &&
                        profileDoctorId.Markdown.description &&
                        <p className="text-[14px]">{profileDoctorId.Markdown.description}</p>
                    }
                    <div>
                        <i className="fas fa-map-marker-alt item-icon"></i>
                        {
                            language === 'vi' ? locationVI : locationEn
                        }
                    </div>

                </div>
            </div>
            <div className="card-profile__right"></div>
        </div>
    )
}

export default ProfileDoctor