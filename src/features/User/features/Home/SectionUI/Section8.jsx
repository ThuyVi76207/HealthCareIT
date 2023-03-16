import React from "react";
import './Section8Styles.scss';
import { withNamespaces } from "react-i18next";

const Section8 = ({ t }) => {
    return (
        <div className="section8">
            <div className="section8-form">
                <div className="section8-form__child">
                    <div className="my-[5px]">
                        <i className="far fa-clock item-icon"></i>
                    </div>
                    <h2 className="text-[25px] font-semibold my-[20px]">{t('section8.title1')}</h2>
                    <p>{t('section8.description1')}</p>
                </div>
                <div className="section8-form__child">
                    <div className="my-[5px]">
                        <i className="fas fa-plus-circle item-icon"></i>
                    </div>
                    <h2 className="text-[25px] font-semibold my-[20px]">{t('section8.title2')}</h2>
                    <p>{t('section8.description2')}</p>
                </div>
                <div className="section8-form__child">
                    <div className="my-[5px]">
                        <i className="fas fa-smile item-icon"></i>
                    </div>
                    <h2 className="text-[25px] font-semibold my-[20px]">{t('section8.title3')}</h2>
                    <p>{t('section8.description3')}</p>
                </div>
            </div>

        </div >
    )
}

export default withNamespaces()(Section8);