import EmailInput from "features/Admin/components/Input/EmailInput";
import { isValidEmail } from "function/formater";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postSendPrescription } from "services/userService";
import { removeModal } from "../../reducers/modal/dialogModalSlice";
function DialogModal() {
    const dispatch = useDispatch();
    const { language } = useSelector((state) => state.user) || {};
    const { title, rightButtonText, patient } = useSelector((state) => state.dialogModal) || {};
    console.log(patient)

    const [email, setEmail] = useState(patient.patientData ? patient.patientData.email : "");
    const [showImg, setShowImg] = useState();
    const [error, setError] = useState({
        email: "",
    })


    const handleCloseModal = () => {
        dispatch(removeModal());
    };

    const handleRightButtonOnClick = async () => {
        let data = {
            email: email,
            imageBase64: showImg,
            doctorId: patient.doctorId,
            patientId: patient.patientId,
            timeType: patient.timeType,
            language: language,
            patientName: patient.patientData.firstName,
        }

        try {
            let res = await postSendPrescription(data)
            console.log("Chwck ", res)

        } catch (error) {
            console.log("Faild to get API send prescription")
        }
        handleCloseModal();
    };


    const isValidated = () => {
        let validated = true;
        let _error = {};
        if (email === "") {
            validated = false;
            _error.email = "Vui lòng nhập email";
        } else if (!isValidEmail(email)) {
            validated = false;
            _error.email = "Email không hợp lệ";
        }

        setError(_error);
        return validated;
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleImageUpload = async (e) => {
        if (e.target.files.length > 0) {
            const image = e.target.files[0];
            const base64 = await convertBase64(image);
            setShowImg(base64);
        }
    };




    if (!title) return;

    return (
        <>
            <div className=" fixed top-0 left-0 w-full h-screen bg-black bg-opacity-80 z-50 bg-blur" onClick={handleCloseModal}></div>
            <div
                id="defaultModal"
                className={`animate__animated animate__bounceIn fixed top-0 right-0 left-0 bottom-0 m-auto z-50 w-full xl:w-[400px] h-[330px]`}
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
                            <EmailInput
                                field="Email"
                                name="email"
                                email={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={"Nhập email người nhận"}
                                maxLength={50}
                                error={error.email}
                                required
                            />
                            <label className="font-bold text-[20px]">Chọn toa thuốc</label>
                            <input
                                className="my-3"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e)}
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
    );
}

export default DialogModal;
