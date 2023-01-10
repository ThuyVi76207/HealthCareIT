import React from "react";
import './Section4Styles.scss';
import imgSection4 from 'assets/Section/Section4.svg';
import { withNamespaces } from "react-i18next";

const Section4 = ({ t }) => {
    return (
        <div className="section4">
            <div className="section4-form">
                <div className="section4-form__image">
                    <img src={imgSection4} alt='hinh anh section4' />
                </div>
                <div className="section4-form__content">
                    <h2 className="uppercase text-[#16917c] text-[18px] font-bold my-[20px]">{t('section4.title1')}</h2>
                    <h2 className="my-[20px] text-[#27284a] text-[22px] font-bold">{t('section4.title2')}</h2>
                    <p className="my-[20px] leading-relaxed">{t('section4.description1')}</p>
                    <p className="my-[20px] leading-relaxed">{t('section4.description2')}</p>
                </div>

            </div>

        </div>
    )
}

export default withNamespaces()(Section4);