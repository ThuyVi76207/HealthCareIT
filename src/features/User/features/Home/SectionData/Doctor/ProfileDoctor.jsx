import React, { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { useSelector } from "react-redux";
import { getProfileDoctorById } from "services/userService";
import './ProfileDoctorStyles.scss';
import ScheduleDoctor from "./ScheduleDoctor";

const ProfileDoctor = ({ id, t }) => {

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
                        <p className="text-[14px] leading-6">{profileDoctorId.Markdown.description}</p>
                    }
                    <div className="my-2">
                        <i className="fas fa-map-marker-alt item-icon mr-1"></i>
                        {
                            language === 'vi' ? locationVI : locationEn
                        }
                    </div>

                </div>
            </div>
            <div className="card-profile__right">
                <ScheduleDoctor id={id} />
                <div className="flex items-center ml-4 mt-2 font-bold">
                    <i className="mr-1 mt-1"><ion-icon name="calendar-outline"></ion-icon></i>
                    <h4 className="uppercase text-[15px]">{t('profiledoctor.schedule')}</h4>
                </div>
            </div>
        </div>
    )
}

export default withNamespaces()(ProfileDoctor)