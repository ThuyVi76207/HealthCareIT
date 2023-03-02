
import { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addSuccessModal } from "reducers/modal/dialogModalSlice";
import { getAllPatientDoctor } from "services/adminService";
import ScheduleCommon from "../PlanManager/ScheduleCommon";

const ListPatient = ({ t }) => {
    const { language } = useSelector((state) => state.user) || {};
    const dispatch = useDispatch();

    const [dateStartContract, setDateStartContract] = useState(
        new Date().toISOString().split("T")[0]
    );

    const profile = useSelector((state) => state.profileuser);
    let id = profile.id;
    const [profilePatient, setProfilePatient] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        let formatedDate = new Date(dateStartContract).getTime() - 25200000;
        const listPatient = async () => {
            let data = {
                doctorId: id,
                date: formatedDate
            };
            setLoading(true);

            try {
                let res = await getAllPatientDoctor(data);
                if (res && res.errCode === 0) {
                    console.log('Check Patient', res);
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
    }, [id, dateStartContract])

    const handleSendPrescription = (patient) => {
        dispatch(addSuccessModal(
            {
                title: "GỬI TOA THUỐC",
                rightButtonText: "XÁC NHẬN",
                patient: patient,
            }
        ))
    };

    return (
        <div>
            <div className="grid grid-cols-3">
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
                        <th>Thời gian</th>
                        <th>Họ và tên</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Tùy chọn</th>
                    </tr>
                    {
                        profilePatient && profilePatient.length > 0
                        && profilePatient.map((item, index) => {
                            let num = `${item.patientData.phonenumber}`
                            let numberPhone = `0${num.slice(3)}`
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{language === 'vi' ? item.timeTypeDataPatient.value_Vi : item.timeTypeDataPatient.value_En}</td>
                                    <td>{item.patientData.firstName}</td>
                                    <td>{item.patientData.address}</td>
                                    <td>{numberPhone}</td>
                                    <td className="text-center">
                                        <button className="mr-2 hover:text-orange-400"
                                            onClick={() => handleSendPrescription(item)}
                                        ><i className="fas fa-check"></i></button>

                                    </td>
                                </tr>
                            )
                        })

                    }
                </tbody>
            </table>

        </div >

    )
}

export default withNamespaces()(ListPatient);