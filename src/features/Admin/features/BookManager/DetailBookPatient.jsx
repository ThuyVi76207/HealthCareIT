import { TIMELINE_OPTIONS } from "constants";
import ManagerLayout from "features/Admin/layouts/ManagerLayout";
import { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addErrorMessage, addWarningMessage } from "reducers/messageSlice";
import { postWarningBooking } from "services/adminService";


const DetailBookPatient = ({ t }) => {

    const { language } = useSelector((state) => state.user) || {};
    const dispatch = useDispatch();
    const [listUserWarning, setListUserWarning] = useState([]);

    let urlParam = new URLSearchParams(window.location.search);
    let doctorId = urlParam.get('doctorId');
    let patientId = urlParam.get('patientId');
    console.log("Check patientId", patientId, doctorId);

    useEffect(() => {
        const postWarningBookingPatient = async () => {
            let data = {
                doctorId: doctorId,
                patientId: patientId,
            }
            try {
                let res = await postWarningBooking(data);
                console.log("Check doctorId", res);
                if (res && res.errCode === 0) {
                    setListUserWarning(res.warningBooking);
                    dispatch(addWarningMessage({ title: "Cảnh báo người dùng đặt quá số lượng cho phép", content: "Cần gọi điện xác nhận!!!!" }))
                } else if (res && res.errCode === 1) {
                    dispatch(addErrorMessage({ title: "Đã có lỗi xảy ra", content: "Vui lòng thử lại sau!!!" }))
                }
            } catch (error) {
                alert('Có lỗi xảy ra vui lòng thử lại sau!!!')
                console.log("Faild to get API patient", error)
            }
        }
        postWarningBookingPatient();

    }, [doctorId, patientId])

    const reverseHours = (h) => {
        let hours = TIMELINE_OPTIONS;
        let hour;
        for (let i = 0; i < hours.length; i++) {
            if (hours[i].value === h) {
                if (language === 'vi') {
                    console.log('Check lít', hours[i].label.vi);
                    hour = hours[i].label.vi;
                } else {
                    console.log('Check lít', hours[i].label.en);
                    hour = hours[i].label.en;
                }
                return hour;

            }
        }
    }



    return (
        <ManagerLayout>
            <div className="w-[95%] mx-auto py-6">
                <div className="py-3">
                    <button className="border border-[#f4f4f4] py-2 px-4 float-right mb-4 hover:bg-[#035795] hover:text-white">Xóa tất cả</button>
                </div>
                <table id="tableManager">
                    <tbody>
                        <tr>
                            <th>STT</th>
                            <th>{t('detailbook.daybook')}</th>
                            <th>{t('detailbook.hourbook')}</th>
                            <th>{t('detailbook.status')}</th>
                            <th>{t('detailbook.option')}</th>
                        </tr>
                        {
                            listUserWarning && listUserWarning.length > 0
                            && listUserWarning.map((item, index) => {
                                let formatdate = parseInt(item.date) + 25200000;
                                let days = new Date(formatdate).toISOString().split("T")[0];
                                let dayReverse = days.split(/\D/).reverse().join('/');
                                // console.log('check date reverse', dayReverse);
                                let hourReverse = reverseHours(item.timeType);
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{dayReverse}</td>
                                        <td>{hourReverse}</td>
                                        <td>{t('detailbook.statusnotverify')}</td>
                                        <td className="">
                                            <div className="flex justify-between w-[50%] mx-auto">
                                                <input className="w-[20px] h-[20px]" type='checkbox' />
                                                <button className="hover:text-red-600"
                                                // onClick={() => handleDeleteNews(item)}
                                                ><i className="fas fa-trash "></i></button>
                                            </div>


                                        </td>
                                    </tr>
                                )
                            })

                        }

                    </tbody>
                </table>
            </div>

        </ManagerLayout>
    )
}

export default withNamespaces()(DetailBookPatient);