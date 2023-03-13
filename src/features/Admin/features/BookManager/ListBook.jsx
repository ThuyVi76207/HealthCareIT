import { getUrlDynamic } from "features/Admin/components/Auth";
import { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllDoctors, getAllPatientStaff } from "services/adminService";
import ScheduleCommon from "../PlanManager/ScheduleCommon";

const ListBook = ({ t }) => {
    const navigate = useNavigate();

    const rolID = sessionStorage.getItem('role');
    const userProfile = JSON.parse(localStorage.getItem(`${rolID}`));

    const [listDoctor, setListDoctor] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(0);
    const { language } = useSelector((state) => state.user) || {};
    const [dateStartContract, setDateStartContract] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [profilePatient, setProfilePatient] = useState([]);
    const [loading, setLoading] = useState(false);

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
                    // console.log("Check list doctor", res.data);
                    setListDoctor(res.data);
                }
            } catch (error) {
                console.log('Faild to get list of Doctor', error)
            }
        }
        getListDoctor();
    }, []);

    useEffect(() => {

        let formatedDate = new Date(dateStartContract).getTime() - 25200000;
        const listPatient = async () => {
            let data = {
                doctorId: selectedDoctor,
                date: formatedDate
            };
            setLoading(true);

            try {
                let res = await getAllPatientStaff(data);
                if (res && res.errCode === 0) {
                    // console.log('Check Patient', res);
                    setLoading(false);
                    setProfilePatient(res.data);
                }

            } catch (error) {
                setLoading(false);
                alert('Có lỗi xảy ra vui lòng thử lại sau!!!')
                console.log("Faild to get API patient", error)
            }
        }

        listPatient();
    }, [selectedDoctor, dateStartContract])

    console.log("Check  Patient", profilePatient);

    const handleDetailPatient = (item) => {
        let userUrl = getUrlDynamic(userProfile.roleId);
        const urlDetailPatient = `/manager/system/${userUrl}/bookmanager/detail-patient/${item.id}/?doctorId=${item.doctorId}&&patientId=${item.patientId}`
        navigate(urlDetailPatient);
        console.log('Check list bokk', item)
    }

    return (
        <div>
            <div className="mb-5 grid grid-cols-2 gap-[10%]">
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


            <table id="tableManager">
                <tbody>
                    <tr>
                        <th>STT</th>
                        {/* <th>Thời gian</th> */}
                        <th>Họ và tên</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Tùy chọn</th>
                    </tr>
                    {
                        profilePatient && profilePatient.length > 0
                        && profilePatient.map((item, index) => {
                            let num = `${item.phonenumber}`
                            let numberPhone = `0${num.slice(3)}`
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    {/* <td>{language === 'vi' ? item.timeTypeDataPatient.value_Vi : item.timeTypeDataPatient.value_En}</td> */}
                                    <td>{item.firstName}</td>
                                    <td>{item.address}</td>
                                    <td>{numberPhone}</td>
                                    <td>{item.email}</td>
                                    <td className="text-center">
                                        {/* {/* <button
                                            className="mr-4 hover:text-orange-400"
                                            onClick={() => handleSendPrescription(item)}
                                        >
                                            <i className="fas fa-check"></i>
                                        </button> */}
                                        <button
                                            className="hover:text-blue-400"
                                            onClick={() => handleDetailPatient(item)}
                                        >
                                            Xem chi tiết
                                        </button>

                                    </td>
                                </tr>
                            )
                        })

                    }

                </tbody>
            </table>
        </div>
    )
}

export default withNamespaces()(ListBook);