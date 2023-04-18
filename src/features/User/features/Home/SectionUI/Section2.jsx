import React from "react";
import { withNamespaces } from "react-i18next";
import imgSection2 from "assets/Section/Section2.svg";
import "./Section2Styles.scss";

const Section2 = ({ t }) => {
  return (
    <div className="section2">
      <div className="section2-form">
        <div className="section2-form__content">
          <h2 className="uppercase text-[#16917c] text-[18px] font-bold my-[20px]">
            {t("section2.title1")}
          </h2>
          <h2 className="my-[20px] text-[#27284a] text-[22px] font-bold">
            {t("section2.title2")}
          </h2>
          <p className="my-[20px] leading-relaxed">
            {t("section2.description1")}
          </p>
          <p className="my-[20px] leading-relaxed">
            {t("section2.description2")}
          </p>
        </div>
        <div className="section2-form__image">
          <img src={imgSection2} alt="hinh anh section2" />
        </div>
      </div>
    </div>
  );
};

export default withNamespaces()(Section2);
