import Loading from "components/Loading/loading";
import CommonInput from "features/Admin/components/Input/CommonInput";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSuccessMessage } from "reducers/messageSlice";
import { removeSendModal } from "reducers/modal/sendModalSlice";
import { postSendRoomID } from "services/userService";

function SendIDModal() {
    const dispatch = useDispatch();
    const { language } = useSelector((state) => state.user) || {};
    const { title, rightButtonText, patient } = useSelector((state) => state.sendModal) || {};
    // console.log(patient)
    const [iDRom, setIDRom] = useState('');
    const [email, setEmail] = useState('');
    // console.log("Check patient", patient)

    const [error, setError] = useState({
        iDRom: "",
    })
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (patient && patient.patientData)
            setEmail(patient.patientData.email)
    }, [patient])

    const isValidated = () => {
        let validated = true;
        let _error = {};
        if (iDRom === "") {
            validated = false;
            _error.iDRom = "Vui lòng nhập mã phòng";
        }

        setError(_error);
        return validated;
    }

    const handleCloseModal = () => {
        dispatch(removeSendModal());
    };

    const handleRightButtonOnClick = async () => {
        if (!isValidated()) return;

        let data = {
            email: email,
            language: language,
            patientName: patient.patientData.firstName,
            roomID: iDRom
        }

        setLoading(true);

        try {
            let res = await postSendRoomID(data);
            console.log("Chwck ", res)
            if (res && res.errCode === 0) {
                setLoading(false);
                dispatch(addSuccessMessage({ title: 'Thành công', content: 'Mã phòng đã được gửi đến bệnh nhân!!!!' }));
            }

        } catch (error) {
            alert("Đã có lỗi xảy ra vui lòng thử lại sau!!!")
            console.log("Faild to get API send prescription")
        }
        handleCloseModal();
    };






    if (!title) return;

    return (
        <>
            <Loading loading={loading} />
            <div className=" fixed top-0 left-0 w-full h-screen bg-black bg-opacity-80 z-50 bg-blur" onClick={handleCloseModal}></div>
            <div
                id="defaultModal"
                className={`animate__animated animate__bounceIn fixed top-0 right-0 left-0 bottom-0 m-auto z-50 w-[400px] h-[245px]`}
            >
                <div className="relative w-full h-full">
                    <div className="relative bg-white h-full rounded-lg shadow">
                        <div className="flex justify-between items-center p-4 rounded-t border-b h-[65px]">
                            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="max-w-full p-4 overflow-y-auto">


                            <CommonInput
                                field="Mã Phòng"
                                name="idRoom"
                                value={iDRom}
                                onChange={(e) => setIDRom(e.target.value)}
                                placeholder="Nhập mã phòng..."
                                maxLength={50}
                                error={error.iDRom}
                                required
                            />

                        </div>
                        <div className="flex items-center py-4 px-2  justify-end rounded-b border-t border-gray-200 ">
                            <button
                                onClick={handleRightButtonOnClick}
                                type="button"
                                className="text-white font-bold bg-green-700 hover:opacity-80 py-1 px-5 rounded mr-2"
                            >
                                {rightButtonText}
                            </button>
                            <button
                                onClick={handleCloseModal}
                                type="button"
                                className="text-white font-bold bg-stone-600 hover:opacity-80 py-1 px-5 rounded "
                            >
                                Hủy
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SendIDModal;