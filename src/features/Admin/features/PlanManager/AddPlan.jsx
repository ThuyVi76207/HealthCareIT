import Loading from "components/Loading/loading";
import { useEffect, useRef, useState } from "react";
import { withNamespaces } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addErrorMessage, addSuccessMessage, addWarningMessage } from "reducers/messageSlice";
import { getAllDoctors, saveBulkSchedudeDoctors } from "services/adminService";
import ScheduleCommon from "./ScheduleCommon";
import TimeLineCommon from "./TimeLineCommon";

const AddPlan = ({ t }) => {
    const dispatch = useDispatch();
    const formRef = useRef(null);
    const { language } = useSelector((state) => state.user) || {};

    const [listDoctor, setListDoctor] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(0);
    const [listTime, setListTime] = useState([]);
    const [loading, setloading] = useState(false);
    const [resetForm, setRessetForm] = useState(false);

    const [dateStartContract, setDateStartContract] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [error, setError] = useState({
        selectedDoctor: '',
    });
    const isValidated = () => {
        let validated = true;
        let _error = {};

        if (selectedDoctor === 0) {
            validated = false;
            _error.selectedDoctor = "Vui lòng chọn bác sĩ"
        }
        setError(_error);
        return validated;
    }

    useEffect(() => {
        const getListDoctor = async () => {
            try {
                let res = await getAllDoctors();
                if (res && res.errCode === 0) {
                    console.log("Check list doctor", res.data);
                    setListDoctor(res.data);
                }
            } catch (error) {
                console.log('Faild to get list of Doctor', error)
            }
        }
        getListDoctor();
    }, []);
    const srollToInput = () => {
        formRef.current.scrollIntoView();

    }
    const handleCreateScheduleOnClick = () => {
        if (loading) return;
        CreateSchedule();
    };

    const handleResetForm = () => {
        setSelectedDoctor(0);
        setRessetForm(true);
    }

    const CreateSchedule = async () => {
        if (!isValidated()) return srollToInput();

        let formatedDate = new Date(dateStartContract).getTime();
        let result = [];
        console.log('formatedDate', formatedDate);

        if (listTime && listTime.length > 0) {
            let selectedTime = listTime.filter((time) => time.isSelected === true);
            selectedTime && selectedTime.length > 0 && selectedTime.map((schedule) => {
                let object = {};
                object.doctorId = selectedDoctor;
                object.date = formatedDate;
                object.timeType = schedule.keyMap;
                result.push(object);
                return (
                    <></>
                )
            })
        }

        let data = {
            arrSchedule: result,
            doctorId: selectedDoctor,
            formatedDate: formatedDate
        }
        setloading(true);
        console.log('Check get data from', data)
        try {
            let saveSchedule = await saveBulkSchedudeDoctors(data);
            console.log('Check save', saveSchedule);
            if (saveSchedule && saveSchedule.errCode === 0) {
                dispatch(addSuccessMessage({ title: 'Tạo thành công', content: 'Lưu thành công lịch làm việc của bác sĩ!!!' }));
                srollToInput();
            } else if (saveSchedule && saveSchedule.errCode === 1) {
                dispatch(addWarningMessage({ title: 'Tạo không thành công', content: 'Vui lòng kiểm tra lại thông tin' }));
                srollToInput();
            }

            setloading(false);
            handleResetForm();
        } catch (error) {
            dispatch(addErrorMessage({ title: "Đã có lỗi xảy ra", content: "Vui lòng thử lại sau!!!" }))
            setloading(false);
            console.log('Faild to create schedule', error);
        }
    }

    const handleListTime = (listtime) => {
        console.log('List time', listtime)
        setListTime(listtime);
        setRessetForm(false);
    }

    return (
        <div className="h-full">
            <Loading loading={loading} />
            <h2 className="text-center text-[25px] font-bold py-12">{t('addplan.titles')}</h2>
            <form ref={formRef}>
                <div className="px-12 grid grid-cols-2 gap-[10%]">
                    <div className="mb-4">
                        <label className="font-bold text-[20px]">{t('addinfordoctor.namedoctor')}</label>
                        <span className="text-red-600">*</span>
                        <select
                            onChange={(e) => setSelectedDoctor(e.target.value)}
                            value={selectedDoctor}
                            className="w-full rounded-[4px] px-2 border-b-2 border-[#003985] placeholder-shown:border-gray-500 focus:outline-none h-[40px]"
                        >
                            <option value={0}>{`--- ${t('addinfordoctor.selecdoctor')} ---`}</option>
                            {listDoctor
                                .map((option) => {
                                    let nameDoctorVi, nameDoctorEn;
                                    nameDoctorVi = `${option.lastName} ${option.firstName}`;
                                    nameDoctorEn = `${option.firstName} ${option.lastName}`;
                                    return (
                                        <option
                                            value={option.id}
                                            key={option.id}
                                        // selected={option.value === selectedRole}
                                        >
                                            {language === 'vi' ? nameDoctorVi : nameDoctorEn}
                                        </option>
                                    )
                                })}
                        </select>
                        {error.selectedDoctor && <span className="text-red-600">{error.selectedDoctor}</span>}
                    </div>

                    <ScheduleCommon
                        field={t('addplan.chooseday')}
                        onChange={(e) => setDateStartContract(e.target.value)}
                        date={dateStartContract}
                    />
                </div>

            </form>
            <div className="px-12">
                <label className="font-bold text-[20px] mt-2">{t('addplan.choosehour')}</label>
                <span className="text-red-600">*</span>
                <TimeLineCommon
                    language={language}
                    updateList={handleListTime}
                    resetForm={resetForm}
                />
            </div>
            <button onClick={handleCreateScheduleOnClick} className="bg-[#003985] text-white text-[18px] font-medium px-4 py-2 mb-5 mt-6 mx-12  rounded-[5px]">{t('createuser.save')}</button>

        </div>
    )
}

export default withNamespaces()(AddPlan);