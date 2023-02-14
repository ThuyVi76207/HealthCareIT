import MainLayout from "features/User/layouts/MainLayout";
import { getFormattedPriceUSD, getFormattedPriceVND } from "function/formater";
import React, { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailInforDoctor } from "services/userService";
import './DoctorDetailStyles.scss';
import ScheduleDoctor from "./ScheduleDoctor";

function DoctorDetail({ t }) {
    const [infoDoctor, setInfoDoctor] = useState({});
    const { id } = useParams();
    const { language } = useSelector((state) => state.user) || {};

    useEffect(() => {
        const printinfoDoctor = async () => {
            try {
                const resDetail = await getDetailInforDoctor(id);
                if (resDetail && resDetail.error === 0) {
                    setInfoDoctor(resDetail.data)
                }

            } catch (error) {
                console.log('Failed to get details doctor', error);
            }
        }

        printinfoDoctor();
    }, [id])

    console.log('Check detail doctor', infoDoctor);

    let nameVi = '', nameEn = '';
    if (infoDoctor && infoDoctor.positionData) {
        nameVi = `${infoDoctor.positionData.value_Vi} ${infoDoctor.lastName} ${infoDoctor.firstName}`;
        nameEn = `${infoDoctor.positionData.value_En} ${infoDoctor.firstName} ${infoDoctor.lastName}`
    }
    let priceVI = 0, priceEn = 0;
    if (infoDoctor && infoDoctor.Doctor_Infor && infoDoctor.Doctor_Infor.priceTypeData) {
        priceVI = parseInt(infoDoctor.Doctor_Infor.priceTypeData.value_Vi);
        priceEn = parseInt(infoDoctor.Doctor_Infor.priceTypeData.value_En);
    }

    return (
        <MainLayout>
            <div className="doctor-detail">
                <div className="doctor-detail__head flex items-center">
                    <div className="w-[70%] mx-auto flex items-center">
                        <i className="text-[30px] text-[#fff] mt-1 mr-1"><ion-icon name="arrow-forward-outline"></ion-icon></i>
                        <h2 className="uppercase text-[22px] text-[#fff] font-bold">{t('detaildoctor.titles')}</h2>
                    </div>
                </div>

                <div className="doctor-detail__content">
                    <div className="flex gap-4 items-center">
                        <img className="w-[110px] h-[110px] rounded-[50%]" src={infoDoctor.image} alt='' />
                        <div className="w-[70%]">
                            <h2 className="uppercase text-[25px] text-[#16917c] font-bold">{language === 'vi' ? nameVi : nameEn}</h2>
                            {
                                infoDoctor && infoDoctor.Markdown &&
                                infoDoctor.Markdown.description &&
                                <p className="text-[14px]">{infoDoctor.Markdown.description}</p>
                            }
                        </div>
                    </div>
                    <div className="flex mt-9 gap-4">
                        <div className="w-[60%]">
                            <ScheduleDoctor id={id} price={language === 'vi' ? priceVI : priceEn} />
                        </div>

                        <div className="border-l border-[#c6c3c3] w-[40%] mt-10">
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
                                <div>
                                    {
                                        infoDoctor &&
                                        infoDoctor.Doctor_Infor &&
                                        infoDoctor.Doctor_Infor.nameClinic &&
                                        <h4 className="text-[15px]">{infoDoctor.Doctor_Infor.nameClinic}</h4>
                                    }
                                </div>
                                {
                                    infoDoctor &&
                                    infoDoctor.Doctor_Infor &&
                                    infoDoctor.Doctor_Infor.addressClinic &&
                                    <h4 className="text-[13px]">{`(${infoDoctor.Doctor_Infor.addressClinic})`}</h4>
                                }



                            </div>
                        </div>
                    </div>

                    <div className="description-doctor mt-7">
                        <div className="title_doctor">
                            <h2 className="text-[22px] font-extrabold uppercase">{t('detaildoctor.overview')}</h2>
                        </div>
                        {
                            infoDoctor && infoDoctor.Markdown && infoDoctor.Markdown.contentHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: infoDoctor.Markdown.contentHTML }}></div>

                        }
                    </div>
                </div>

            </div>
        </MainLayout>

    )
}

export default withNamespaces()(DoctorDetail);