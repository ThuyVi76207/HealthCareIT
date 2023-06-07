import LineChart from "features/Admin/components/Chart/LineChart";
import { useEffect, useRef, useState } from "react";
import { withNamespaces } from "react-i18next";
import { useSelector } from "react-redux";
import { getAllDoctors, statisticsBookingDoctor } from "services/adminService";

const AddStatistics = ({ t }) => {
  const formRef = useRef(null);
  const [listCost, setListCost] = useState([]);
  const { language } = useSelector((state) => state.user) || {};
  const [listDoctor, setListDoctor] = useState([]);

  const [selectedDoctor, setSelectedDoctor] = useState(0);
  const [isDoctor, setIsDoctor] = useState(false);
  const [listYear, setListYear] = useState([]);
  const [selectYear, setSelectYear] = useState(new Date().getFullYear());

  const [useProf, setUseProf] = useState();

  const [error, setError] = useState({
    selectedDoctor: "",
  });
  const isValidated = () => {
    let validated = true;
    let _error = {};

    if (selectedDoctor === 0) {
      validated = false;
      _error.selectedDoctor = "Vui lòng chọn bác sĩ";
    }
    setError(_error);
    return validated;
  };

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem("R2"));
    if (userProfile == null) {
      return;
    } else {
      setUseProf(userProfile);
      setIsDoctor(true);
      setSelectedDoctor(userProfile.id);
    }
  }, []);

  const srollToInput = () => {
    formRef.current.scrollIntoView();
  };

  const postStatisticsBooking = async () => {
    if (!isValidated()) return srollToInput();
    let data = {
      doctorId: selectedDoctor,
      year: +selectYear,
    };
    console.log("Check data", data);
    try {
      let res = await statisticsBookingDoctor(data);
      if (res && res.errCode === 0) {
        setListCost(res.monthlyStats);
        console.log("Check res statisticsBookingDoctor", res);
      }
    } catch (error) {
      console.log("Faild API error", error);
    }
  };

  const handleStatisticsOnClick = () => {
    postStatisticsBooking();
  };

  useEffect(() => {
    const getListDoctor = async () => {
      try {
        let res = await getAllDoctors();
        if (res && res.errCode === 0) {
          console.log("Check list doctor", res.data);
          setListDoctor(res.data);
        }
      } catch (error) {
        console.log("Faild to get list of Doctor", error);
      }
    };
    getListDoctor();
  }, []);

  useEffect(() => {
    const year = (startYear) => {
      var currentYear = new Date().getFullYear(),
        years = [];
      startYear = startYear || 1980;
      while (startYear <= currentYear) {
        years.unshift(startYear++);
      }
      return years;
    };
    setListYear(year(2022));
  }, []);

  console.log(selectYear);
  return (
    <div className="p-6">
      <h2 className="text-center text-[25px] font-bold py-6">Thống kê</h2>
      <form ref={formRef}>
        <div className="px-12 grid grid-cols-2 gap-[10%]">
          <div className="mb-4">
            <label className="font-bold text-[20px]">
              {t("addinfordoctor.namedoctor")}
            </label>
            <span className="text-red-600">*</span>
            {isDoctor ? (
              <h2>
                {language === "vi"
                  ? `${useProf.lastName} ${useProf.firstName}`
                  : `${useProf.firstName} ${useProf.lastName}`}
              </h2>
            ) : (
              <select
                onChange={(e) => setSelectedDoctor(e.target.value)}
                value={selectedDoctor}
                className="w-full rounded-[4px] px-2 border-b-2 border-[#003985] placeholder-shown:border-gray-500 focus:outline-none h-[40px]"
              >
                <option value={0}>{`--- ${t(
                  "addinfordoctor.selecdoctor"
                )} ---`}</option>
                {listDoctor.map((option) => {
                  let nameDoctorVi, nameDoctorEn;
                  nameDoctorVi = `${option.lastName} ${option.firstName}`;
                  nameDoctorEn = `${option.firstName} ${option.lastName}`;
                  return (
                    <option
                      value={option.id}
                      key={option.id}
                      // selected={option.value === selectedRole}
                    >
                      {language === "vi" ? nameDoctorVi : nameDoctorEn}
                    </option>
                  );
                })}
              </select>
            )}
            {error.selectedDoctor && (
              <span className="text-red-600">{error.selectedDoctor}</span>
            )}
          </div>

          <div className="pb-5 w-full">
            <label className="text-[20px] font-bold" htmlFor="date">
              Chọn năm
            </label>
            <span className="text-red-600 text-[20px]">*</span>
            <select
              onChange={(e) => setSelectYear(e.target.value)}
              value={selectYear}
              className="w-full rounded-[4px] px-2 border-b-2 border-[#003985] placeholder-shown:border-gray-500 focus:outline-none h-[40px]"
            >
              {listYear &&
                listYear.length > 0 &&
                listYear.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </form>
      <button
        onClick={handleStatisticsOnClick}
        className="bg-[#003985] text-white text-[16px] font-medium px-3 py-2 mb-7 mt-2 mx-12  rounded-[5px]"
      >
        Thống kê
      </button>

      <LineChart listCost={listCost} />
    </div>
  );
};

export default withNamespaces()(AddStatistics);
