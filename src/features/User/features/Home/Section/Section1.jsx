import React from "react";
import './Section1Styles.scss';
import { withNamespaces } from "react-i18next";

const Section1 = ({ t }) => {
    return (
        <div className="section1">
            <div className="section1__child">
                <div className="text-[#000]">
                    <i class="fa-solid fa-circle-location-arrow text-[#000]"></i>
                </div>
                <h2>{t('section1.title1')}</h2>
                <p>{t('section1.description1')}</p>
            </div>
            <div className="section1__child">
                <div></div>
                <h2>{t('section1.title2')}</h2>
                <p>{t('section1.description2')}</p>
            </div>
            <div className="section1__child">
                <div></div>
                <h2>{t('section1.title3')}</h2>
                <p>{t('section1.description3')}</p>
            </div>
        </div >
    )
}

export default withNamespaces()(Section1);