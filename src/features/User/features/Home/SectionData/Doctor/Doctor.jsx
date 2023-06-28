import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { getTopDoctorHomeService } from "services/userService";
import { Buffer } from "buffer";
import "./DoctorStyles.scss";
import { useNavigate } from "react-router-dom";
import loadingAPI from "assets/Loading/LoadingAPI.gif";

function Doctor() {
  const [listTopDoctor, setListTopDoctor] = useState([]);
  const { language } = useSelector((state) => state.user) || {};
  const navigate = useNavigate();

  // console.log('Check language', language);

  let settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
    ],
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />
  };

  useEffect(() => {
    const printTopDoctorHome = async () => {
      try {
        const res = await getTopDoctorHomeService("10");
        setListTopDoctor(res.data);
      } catch (err) {
        console.log("Failed get top doctor home page", err);
      }
    };
    printTopDoctorHome();
  }, []);

  console.log("Top doctor home page", listTopDoctor);

  const handleViewDetailDoctor = (item) => {
    const urlDetailDoctor = `/healthcare/detail-doctor/${item.id}`;
    navigate(urlDetailDoctor);
  };

  return (
    <div className="section-doctor">
      <div className="share-container">
        <div className="doctor-body"></div>
        {listTopDoctor.length === 0 && (
          // <img className="w-[365px] mx-auto" src={loadingAPI} alt="loading" />
          <div className="container-loading">
            <div className="container-loading_text">
              <h1>Loading...</h1>
            </div>
            <div className="container-loading_body">
              <div className="line-box">
                <div className="line"></div>
              </div>
            </div>
          </div>
        )}
        <Slider {...settings}>
          {listTopDoctor &&
            listTopDoctor.length > 0 &&
            listTopDoctor.map((item, index) => {
              let imageBase64 = "";
              if (item.image) {
                imageBase64 = Buffer.from(item.image, "base64").toString(
                  "binary"
                );
              }

              let nameVi = `${item.lastName} ${item.firstName}`;
              let nameEn = `${item.firstName} ${item.lastName}`;
              // console.log('Check image', item.image)

              return (
                <div
                  className="doctor-customize cursor-pointer hover:text-[#16917c]"
                  key={index}
                  onClick={() => handleViewDetailDoctor(item)}
                >
                  <img
                    className="doctor-image mx-auto mt-3"
                    style={{ height: "170px", width: "170px" }}
                    src={imageBase64}
                    alt={index}
                  />
                  <h2 className="text-[20px] font-bold text-center mt-4">
                    {language === "vi"
                      ? item.positionData.value_Vi
                      : item.positionData.value_En}
                  </h2>
                  <div className="text-doctor">
                    <b>{language === "vi" ? nameVi : nameEn}</b>
                  </div>
                </div>
              );
            })}
          <div className="doctor-customize_f"></div>
        </Slider>
      </div>
    </div>
  );
}

export default Doctor;
