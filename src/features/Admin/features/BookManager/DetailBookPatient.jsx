import ManagerLayout from "features/Admin/layouts/ManagerLayout";
import { useEffect } from "react";
import { postWarningBooking } from "services/adminService";


const DetailBookPatient = () => {
    let urlParam = new URLSearchParams(window.location.search);
    let doctorId = urlParam.get('doctorId');
    let patientId = urlParam.get('patientId');
    console.log("Check patientId", patientId, doctorId);

    useEffect(() => {
        const postWarningBookingPatient = async () => {
            try {
                let res = await postWarningBooking({
                    doctorId: doctorId,
                    patientId: patientId,

                });
                console.log("Check doctorId", res);
            } catch (error) {
                alert('Có lỗi xảy ra vui lòng thử lại sau!!!')
                console.log("Faild to get API patient", error)
            }
        }
        postWarningBookingPatient();

    }, [doctorId, patientId])

    return (
        <ManagerLayout>

        </ManagerLayout>
    )
}

export default DetailBookPatient;