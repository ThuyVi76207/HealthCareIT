import React from "react";
import './Section1Styles.scss';
import { withNamespaces } from "react-i18next";

const Section1 = ({ t }) => {
    return (
        <div className="section1">
            <div className="section1-form">
                <div className="section1-form__child">
                    <div className="my-[20px]">
                        <i className="fas fa-map-marker-alt item-icon"></i>
                    </div>
                    <h2 className="text-[25px] font-semibold my-[20px]">{t('section1.title1')}</h2>
                    <p>{t('section1.description1')}</p>
                </div>
                <div className="section1-form__child">
                    <div className="my-[20px]">
                        <i className="fa fa-user-md item-icon" aria-hidden="true"></i>
                    </div>
                    <h2 className="text-[25px] font-semibold my-[20px]">{t('section1.title2')}</h2>
                    <p>{t('section1.description2')}</p>
                </div>
                <div className="section1-form__child">
                    <div className="my-[20px]">
                        <i className="fas fa-calendar-alt item-icon"></i>
                    </div>
                    <h2 className="text-[25px] font-semibold my-[20px]">{t('section1.title3')}</h2>
                    <p>{t('section1.description3')}</p>
                </div>
            </div>

        </div >
    )
}

export default withNamespaces()(Section1);