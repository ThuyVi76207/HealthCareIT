import MainLayout from "features/User/layouts/MainLayout";
import { getFormattedPriceUSD, getFormattedPriceVND } from "function/formater";
import React, { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createComment,
  getAllCommentByDoctor,
  getDetailInforDoctor,
} from "services/userService";
import "./DoctorDetailStyles.scss";
import ScheduleDoctor from "./ScheduleDoctor";
import { addErrorMessage, addSuccessMessage } from "reducers/messageSlice";
import LoadingSpinner2 from "components/Loading/LoadingSpinner2";

function DoctorDetail({ t }) {
  const [infoDoctor, setInfoDoctor] = useState({});
  const { id } = useParams();
  const { language } = useSelector((state) => state.user) || {};

  const stars = Array(5).fill(0);
  const [currentStar, setCurrentStar] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);

  const [comment, setComment] = useState("");

  const rolID = sessionStorage.getItem("role");
  const userProfile = JSON.parse(localStorage.getItem(`${rolID}`));
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [error, setError] = useState({
    comment: "",
  });

  const isValidated = () => {
    let validated = true;
    let _error = {};
    if (comment === "") {
      validated = false;
      _error.comment = "Vui lòng nhập bình luận";
    }

    setError(_error);
    return validated;
  };

  useEffect(() => {
    const printinfoDoctor = async () => {
      try {
        const resDetail = await getDetailInforDoctor(id);
        if (resDetail && resDetail.error === 0) {
          setInfoDoctor(resDetail.data);
        }
      } catch (error) {
        alert("Có lỗi xảy ra vui lòng quay lại sau!!");
        console.log("Failed to get details doctor", error);
      }
    };

    printinfoDoctor();
  }, [id]);

  console.log("Check detail doctor", infoDoctor);

  let nameVi = "",
    nameEn = "";
  if (infoDoctor && infoDoctor.positionData) {
    nameVi = `${infoDoctor.positionData.value_Vi} ${infoDoctor.lastName} ${infoDoctor.firstName}`;
    nameEn = `${infoDoctor.positionData.value_En} ${infoDoctor.firstName} ${infoDoctor.lastName}`;
  }
  let priceVI = 0,
    priceEn = 0;
  if (
    infoDoctor &&
    infoDoctor.Doctor_Infor &&
    infoDoctor.Doctor_Infor.priceTypeData
  ) {
    priceVI = parseInt(infoDoctor.Doctor_Infor.priceTypeData.value_Vi);
    priceEn = parseInt(infoDoctor.Doctor_Infor.priceTypeData.value_En);
  }

  //Rating
  const handleClick = (value) => {
    setCurrentStar(value);
  };

  const handleMouseOver = (value) => {
    setHoverStar(value);
  };

  const handleMouseLeave = () => {
    setHoverStar(undefined);
  };

  const handleCreateCommentOnclick = () => {
    if (userProfile && userProfile.isLogin === true) {
      if (isValidated() === true) {
        handleCreateComment();
      }
      // console.log("sussecss");
    } else {
      navigate(`/healthcare/login/user`);
    }
  };

  const handleCreateComment = async () => {
    let data = {
      userName: userProfile.lastName + " " + userProfile.firstName,
      patientId: userProfile.id,
      commentData: comment,
      rating: currentStar === 0 ? +5 : currentStar,
      doctorId: infoDoctor.id,
      image: null,
    };
    setLoading(true);
    try {
      let res = await createComment(data);
      if (res && res.errCode === 0) {
        console.log("Check comment", res);
        setComment("");
        setCurrentStar(0);
        dispatch(
          addSuccessMessage({
            title: "Bình luận thành công",
            content: "Bình luận của bạn đã được đăng",
          })
        );
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      addErrorMessage({
        title: "Đã có lỗi xảy ra",
        content: "Vui lòng thử lại sau!!!",
      });
      console.log("Failed to create comment", error);
    }
  };

  console.log("Check star rating and comment", currentStar, comment);

  useEffect(() => {
    const getListComment = async () => {
      let data = {
        limitInput: null,
        doctorId: infoDoctor.id,
      };
      try {
        let res = await getAllCommentByDoctor(data);
        console.log("Check list comment", res);
      } catch (error) {
        console.log("Faild get list comment", error);
      }
    };
    getListComment();
  }, []);
  return (
    <MainLayout>
      <div className="doctor-detail">
        <div className="doctor-detail__head flex items-center">
          <div className="doctor-detail__head__title  mx-auto flex items-center">
            {/* <i className="text-[30px] text-[#fff] mt-1 mr-1">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </i>
            <h2 className="uppercase text-[22px] text-[#fff] font-bold">
              {t("detaildoctor.titles")}
            </h2> */}
          </div>
        </div>

        <div className="doctor-detail__content">
          <div className="flex gap-4">
            <img
              className="w-[110px] h-[110px] rounded-[50%]"
              src={infoDoctor.image}
              alt=""
            />
            <div className="w-[70%]">
              <h2 className="uppercase text-[25px] text-[#16917c] font-bold">
                {language === "vi" ? nameVi : nameEn}
              </h2>
              {infoDoctor &&
                infoDoctor.Markdown &&
                infoDoctor.Markdown.description && (
                  <p className="text-[14px]">
                    {infoDoctor.Markdown.description}
                  </p>
                )}
            </div>
          </div>
          <div className="doctor-detail__content__chedule">
            <div className="content-up">
              <ScheduleDoctor
                id={id}
                price={language === "vi" ? priceVI : priceEn}
                profile={infoDoctor}
              />
            </div>

            <div className="content-down border-[#c6c3c3] ">
              <div className="ml-4 mt-2 flex items-center">
                <i className="mr-1 mt-1">
                  <ion-icon name="cash-outline"></ion-icon>
                </i>
                <h4 className="uppercase text-[15px] font-bold mr-1">
                  {t("profiledoctor.price")}
                </h4>
                {language === "vi" ? (
                  <span>{getFormattedPriceVND(priceVI)}</span>
                ) : (
                  <span>{getFormattedPriceUSD(priceEn)}</span>
                )}
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  <i className="mr-1 mt-2 text-[15px]">
                    <ion-icon name="medkit-outline"></ion-icon>
                  </i>
                  <h4 className="text-[15px] font-bold uppercase mt-1">
                    {t("profiledoctor.workaddress")}
                  </h4>
                </div>
                <div>
                  {infoDoctor &&
                    infoDoctor.Doctor_Infor &&
                    infoDoctor.Doctor_Infor.nameClinic && (
                      <h4 className="text-[15px]">
                        {infoDoctor.Doctor_Infor.nameClinic}
                      </h4>
                    )}
                </div>
                {infoDoctor &&
                  infoDoctor.Doctor_Infor &&
                  infoDoctor.Doctor_Infor.addressClinic && (
                    <h4 className="text-[13px]">{`(${infoDoctor.Doctor_Infor.addressClinic})`}</h4>
                  )}
              </div>
            </div>
          </div>

          <div className="description-doctor mt-7">
            <div className="title_doctor">
              <h2 className="text-[22px] font-extrabold uppercase">
                {t("detaildoctor.overview")}
              </h2>
            </div>
            {infoDoctor &&
              infoDoctor.Markdown &&
              infoDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: infoDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
        </div>
        <div className="border-t border-gray-300 bg-[#f9f9f9]">
          <div className="w-[70%] mx-auto py-2">
            <h2 className="text-[20px] font-bold my-4">
              Phản hồi của bệnh nhân sau khi khám
            </h2>
            <div>
              {stars.map((_, index) => {
                return (
                  <i
                    key={index}
                    className={`text-[24px] mr-[10px] cursor-pointer ${
                      (hoverStar || currentStar) > index
                        ? "text-orange-400"
                        : "text-gray-500"
                    }`}
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ion-icon name="star-outline"></ion-icon>
                  </i>
                );
              })}
            </div>

            <div className="w-[65%] mb-4">
              <label className="font-bold text-[20px] inline-block">
                Bình luận
              </label>
              <span className="text-red-600">*</span>
              {error.comment && (
                <span className="text-red-600">{error.comment}</span>
              )}
              <textarea
                className="form-control block mt-2 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                          rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                rows="4"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              ></textarea>
            </div>

            <button
              onClick={handleCreateCommentOnclick}
              className="bg-gray-300 hover:bg-orange-400 py-1 px-6 rounded-[5px] text-[18px] text-gray-500 hover:text-black font-semibold "
            >
              Đăng
              {loading ? <LoadingSpinner2 loading={loading} /> : ""}
            </button>
          </div>
        </div>
        <div className="border-t border-gray-300 bg-[#f9f9f9]">
          <div className="w-[70%] mx-auto py-2"></div>
        </div>
      </div>
    </MainLayout>
  );
}

export default withNamespaces()(DoctorDetail);
