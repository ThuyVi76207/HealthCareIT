import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "moment/locale/vi";
import { getScheduleDoctorByDate } from "services/userService";
import { withNamespaces } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { addInforTime } from "reducers/timeworkSlice";
import { addInforDoctor } from "reducers/inforDoctorSlice";
import "./SheduleDoctorStyles.scss";

const ScheduleDoctor = ({ id, price, t, profile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { language } = useSelector((state) => state.user) || {};
  console.log("language", language);
  const [scheduleDoctor, setScheduleDoctor] = useState([]);
  const [timeWork, setTimeWork] = useState([]);
  const [selectedDate, setSelectedDate] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getArrDays = useCallback((language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === "en") {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          let labelEn = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
          object.label = labelEn;
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM"); // dddd: Thứ - DD:Ngày/MM:Tháng
          object.label = capitalizeFirstLetter(labelVi);
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    // console.log("Check all day", allDays);
    setScheduleDoctor(allDays);

    return allDays;
  }, []);

  useEffect(() => {
    const printScheduleDoctor = async () => {
      let getAlldays = getArrDays(language);
      // console.log('Chekc day', getAlldays);
      try {
        if (getAlldays && getAlldays.length > 0) {
          const resSchedule = await getScheduleDoctorByDate(
            id,
            getAlldays[selectedDate].value
          );
          if (resSchedule && resSchedule.errCode === 0) {
            //Get all work days doctor
            setTimeWork(resSchedule.data);
          }

          // console.log('check get days', resSchedule.data);
        }
      } catch (err) {
        console.log("Failed to print schedule", err);
      }
    };
    printScheduleDoctor();
  }, [id, language, selectedDate, getArrDays]);

  // console.log("Check time work", timeWork)
  console.log("Check price", price);

  const handleScheduleDoctor = (time) => {
    console.log("Check time work", time);
    console.log("Check profile", profile);

    localStorage.setItem("timework", JSON.stringify(time));
    localStorage.setItem("profiledoctor", JSON.stringify(profile));
    dispatch(addInforTime(time));
    dispatch(addInforDoctor(profile));
    // navigate(
    //   `/healthcare/booking-schedule/${time.date}/${time.timeType}/?price=${price}`
    // );
  };

  return (
    <div className=" chedule-prof-doctor">
      <select
        className="border-b border-[#c6c3c3] rounded-[50px] focus:outline-none py-1 px-3 text-[#16917c] text-[16px] font-semibold"
        onChange={(e) => setSelectedDate(e.target.value)}
      >
        {scheduleDoctor &&
          scheduleDoctor.length > 0 &&
          scheduleDoctor.map((item, index) => {
            return (
              <option key={index} value={index}>
                {item.label}
              </option>
            );
          })}
      </select>
      <div className="flex items-center ml-2 mt-2 font-bold">
        <i className="mr-1 mt-1">
          <ion-icon name="calendar-outline"></ion-icon>
        </i>
        <h4 className="uppercase text-[15px]">
          {t("scheduledoctor.schedule")}
        </h4>
      </div>
      <div className="ml-2 mt-2">
        {timeWork && timeWork.length > 0 ? (
          <div className="">
            <div>
              {timeWork.map((item, index) => {
                let timeDisplay =
                  language === "vi"
                    ? item.timeTypeData.value_Vi
                    : item.timeTypeData.value_En;
                return (
                  <button
                    key={index}
                    className={`mr-2 mb-2 bg-slate-200 hover:bg-yellow-300 ${
                      language === "vi"
                        ? "min-w-[110px] py-2 "
                        : "min-w-[150px] py-3"
                    }`}
                    onClick={() => handleScheduleDoctor(item)}
                  >
                    {timeDisplay}
                  </button>
                );
              })}
            </div>
            <div className="border-b border-b-[#d4d3d3] pb-1">
              <span>{t("scheduledoctor.choose")}</span>{" "}
              <i className="far fa-hand-point-up"></i>{" "}
              <span>{t("scheduledoctor.bookfree")}</span>
            </div>
          </div>
        ) : (
          <h3 className="text-gray-400 border-b border-b-[#d4d3d3] pb-1">
            {t("scheduledoctor.noschedule")}
          </h3>
        )}
      </div>
    </div>
  );
};

export default withNamespaces()(ScheduleDoctor);
