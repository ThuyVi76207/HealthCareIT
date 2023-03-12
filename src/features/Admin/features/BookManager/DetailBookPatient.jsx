import ManagerLayout from "features/Admin/layouts/ManagerLayout";
import { useEffect } from "react";
import { getWarningBooking } from "services/adminService";


const DetailBookPatient = () => {
    let urlParam = new URLSearchParams(window.location.search);
    let doctorId = urlParam.get('doctorId');
    let patientId = urlParam.get('patientId');
    console.log("Check patientId", patientId, doctorId);

    useEffect(() => {
        const getWarningBookingPatient = async () => {

            console.log(patientId, doctorId)

            try {
                let res = await getWarningBooking({
                    doctorId: 70,
                    patientId: 72,
                });
                console.log("Chekc waring", res);
            } catch (error) {
                alert('Có lỗi xảy ra vui lòng thử lại sau!!!')
                console.log("Faild to get API patient", error)
            }
        }

        getWarningBookingPatient();

    }, [doctorId, patientId])
    return (
        <ManagerLayout>

        </ManagerLayout>
    )
}

export default DetailBookPatient;