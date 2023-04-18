import React from "react";
import { withNamespaces } from "react-i18next";
import "./BannerStyles.scss";
import bannerImg from "assets/Banner/H-banner.svg";
import { useNavigate } from "react-router-dom";

const Banner = ({ t }) => {
  const navigate = useNavigate();

  const handleRegisterOnclick = () => {
    navigate(`/healthcare/register`);
  };
  const handleLoginOnclick = () => {
    navigate(`/healthcare/login/user`);
  };
  return (
    <div className="banner">
      <div className="banner-container">
        <div className="banner-container__left">
          <h2 className=" titlebig font-bold mb-1">
            <span className="text-[#27284a]">{t("banner.bntitle1")}</span>{" "}
            <span className="text-[#16917c]">{t("banner.bntitle2")}</span>
          </h2>
          <h3>{t("banner.bncontent")}</h3>
          <div className="mt-[20px]">
            <button
              onClick={handleLoginOnclick}
              className="bg-[#27284a]  py-[15px] hover:bg-[#16917c] text-white rounded-[35px] mr-4"
            >
              {t("banner.btn1")}
            </button>
            <button
              onClick={handleRegisterOnclick}
              className="bg-[#27284a] py-[15px] hover:bg-[#16917c] text-white rounded-[35px]"
            >
              {t("banner.btn2")}
            </button>
          </div>
        </div>
        <div className="banner-container__right">
          <img src={bannerImg} alt="Hình ảnh không tồn tại" />
        </div>
      </div>
    </div>
  );
};

export default withNamespaces()(Banner);
