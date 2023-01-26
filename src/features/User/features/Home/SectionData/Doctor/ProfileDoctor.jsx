import { getFormattedPriceUSD, getFormattedPriceVND } from "function/formater";
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
                console.log('Check profile', resProfile.data);
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

    let priceVI = 0, priceEn = 0;
    if (profileDoctorId && profileDoctorId.Doctor_Infor && profileDoctorId.Doctor_Infor.priceTypeData) {
        priceVI = parseInt(profileDoctorId.Doctor_Infor.priceTypeData.value_Vi);
        priceEn = parseInt(profileDoctorId.Doctor_Infor.priceTypeData.value_En);
    }

    // console.log('Check location', locationVI, locationEn)

    return (
        <div className="card-profile">
            <div className="card-profile__left">
                <div className="w-[20%] mr-2">
                    <img className="w-[110px] h-[110px] rounded-[50%]" src={profileDoctorId.image} alt="" />
                    <button className="text-[15px] text-[#16917c] mt-2 ml-5">{t('profiledoctor.more')}</button>
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
                <div className="ml-4 mt-2 flex items-center">
                    <i className="mr-1 mt-1"><ion-icon name="cash-outline"></ion-icon></i>
                    <h4 className="uppercase text-[15px] font-bold mr-1">{t('profiledoctor.price')}</h4>
                    {
                        language === 'vi' ? <span>{getFormattedPriceVND(priceVI)}</span> : <span>{getFormattedPriceUSD(priceEn)}</span>
                    }
                </div>
                <div className="ml-4">
                    <div className="flex items-center">
                        <i className="mr-1 mt-2 text-[15px]"><ion-icon name="medkit-outline"></ion-icon></i>
                        <h4 className="text-[15px] font-bold uppercase mt-1">{t('profiledoctor.workaddress')}</h4>
                    </div>

                    {
                        profileDoctorId &&
                        profileDoctorId.Doctor_Infor &&
                        profileDoctorId.Doctor_Infor.nameClinic &&
                        <h4 className="text-[15px]">{profileDoctorId.Doctor_Infor.nameClinic}</h4>
                    }
                </div>
            </div>
        </div>
    )
}

export default withNamespaces()(ProfileDoctor)