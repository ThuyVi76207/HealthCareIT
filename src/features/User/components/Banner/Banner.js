import React from "react";
import { withNamespaces } from "react-i18next";
import './BannerStyles.scss';
import bannerImg from "assets/Banner/H-banner.svg";

const Banner = ({ t }) => {
    return (
        <div className="banner">
            <div className="banner-container">
                <div className="banner-container__left">
                    <h2 className="text-[40px] font-bold mb-1"><span className="text-[#27284a]">{t('banner.bntitle1')}</span>{" "}<span className="text-[#16917c]">{t('banner.bntitle2')}</span></h2>
                    <h3>{t('banner.bncontent')}</h3>
                    <div className="mt-[20px]">
                        <button className="bg-[#27284a] hover:bg-[#16917c] text-white px-[40px] py-[15px] rounded-[35px] mr-4">{t('banner.btn1')}</button>
                        <button className="bg-[#27284a] hover:bg-[#16917c] text-white px-[40px] py-[15px] rounded-[35px]">{t('banner.btn2')}</button>
                    </div>
                </div>
                <div className="banner-container__right">
                    <img src={bannerImg} alt="Hình ảnh không tồn tại" />
                </div>
            </div>
        </div>

    )
}

export default withNamespaces()(Banner)