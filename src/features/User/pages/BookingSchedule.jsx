import { formatMonthAndDate, getFormattedPriceUSD, getFormattedPriceVND, isValidEmail, isValidPhoneNumber } from "function/formater";
import { useCallback, useMemo, useRef, useState } from "react";
import { withNamespaces } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CommonInput from "features/Admin/components/Input/CommonInput";
import PhoneInput from "features/Admin/components/Input/PhoneInput";
import EmailInput from "features/Admin/components/Input/EmailInput";
import BirthdayInput from "../components/BirthdayInput/BirthdayInput";
import { GENDER_OPTIONS } from "constants";
import moment from "moment";
import _ from "lodash";
import { postPatientBooking, postSendSMS } from "services/userService";
import { addErrorMessage, addSuccessMessage, addWarningMessage } from "reducers/messageSlice";
import PaymentMethodSection from "../features/PaymentMenthod/PaymentSection";

const BookingSchedule = ({ t }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const timeSchedule = useSelector((state) => state.timework) || {};
    const inforDoctor = useSelector((state) => state.inforDoctor) || {};
    const { language } = useSelector((state) => state.user) || {};
    const [date, setDate] = useState('');

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [dateFinalContract, setDateFinalContract] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [selectedGender, setSelectedGender] = useState("M");
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        description: ''
    })

    const formref = useRef(null);

    const isValidated = () => {
        let validated = true;
        let _error = {};
        if (name === "") {
            validated = false;
            _error.name = "Vui lòng nhập họ và tên";
        }
        if (phoneNumber === "") {
            validated = false;
            _error.phoneNumber = "Vui lòng nhập số điện thoại"
        } else if (!isValidPhoneNumber(phoneNumber)) {
            validated = false;
            _error.phoneNumber = "Số điện thoại không hợp lệ"
        }
        if (email === "") {
            validated = false;
            _error.email = "Vui lòng nhập email";
        } else if (!isValidEmail(email)) {
            validated = false;
            _error.email = "Email không hợp lệ";
        }
        if (address === "") {
            validated = false;
            _error.address = "Vui lòng nhập địa chỉ"
        }
        if (description === '') {
            validated = false;
            _error.description = "Vui lòng nhập thông tin giới thiệu"
        }
        setError(_error);
        return validated;
    }

    console.log("Check schedule for booking", timeSchedule);
    console.log("Check inforDoctor schedule", inforDoctor);

    let nameVi = '', nameEn = '';
    if (inforDoctor && inforDoctor.positionData) {
        nameVi = `${inforDoctor.positionData.value_Vi} ${inforDoctor.lastName} ${inforDoctor.firstName}`;
        nameEn = `${inforDoctor.positionData.value_En} ${inforDoctor.firstName} ${inforDoctor.lastName}`;
    }

    const checkIfVerifiedExists = (object) => {
        if (Object.keys(object).length === 0) {
            return true;
        }
        return false;
    };

    const handleTime = useCallback((language, timeSchedule) => {

        const daysVi = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
        const daysEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let daymonthyear;
        let formatDate = +timeSchedule.date;

        if (language === 'vi') {
            // console.log("Check err", timeSchedule)
            daymonthyear = timeSchedule.timeTypeData.value_Vi + " - " + daysVi[new Date(formatDate).getDay()] +
                " - " + formatMonthAndDate(new Date(formatDate).getDate()) +
                "/" + formatMonthAndDate(new Date(formatDate).getMonth() + 1) +
                "/" + new Date(formatDate).getFullYear();

        } else {
            daymonthyear = timeSchedule.timeTypeData.value_En + " - " + daysEn[new Date(formatDate).getDay()] +
                " - " + new Date(formatDate).getFullYear() +
                "/" + formatMonthAndDate(new Date(formatDate).getMonth() + 1) +
                "/" + formatMonthAndDate(new Date(formatDate).getDate());

        }
        return daymonthyear;
    }, [])

    useMemo(() => {
        if (checkIfVerifiedExists(timeSchedule)) return;
        let obj = timeSchedule
        let day = handleTime(language, obj)
        setDate(day);
    }, [language, timeSchedule, handleTime])

    // const srollToInput = () => {
    //     formref.current.scrollIntoView();
    // }

    // const buildTimeBooking = (dataTime) => {
    //     if (dataTime && !_.isEmpty(dataTime)) {
    //         let time = language === 'vi' ?
    //             dataTime.timeTypeData.value_Vi : dataTime.timeTypeData.value_En;
    //         let date = language === 'vi' ?
    //             moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
    //             :
    //             moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')

    //         return `${time} - ${date}`
    //     }
    //     return ''
    // }

    // const buidDoctorName = (dataTime) => {
    //     if (dataTime && !_.isEmpty(dataTime)) {
    //         let name = language === 'vi' ?
    //             `${dataTime.doctorData.lastName} - ${dataTime.doctorData.firstName}`
    //             :
    //             `${dataTime.doctorData.firstName} - ${dataTime.doctorData.lastName}`
    //         return name;
    //     }
    //     return ''
    // }

    // const handleConfirmBooking = () => {
    //     if (loading) return;
    //     saveConfirmBookin();
    // }



    // const saveConfirmBookin = async () => {
    //     if (!isValidated()) return srollToInput();

    //     let timeString = buildTimeBooking(timeSchedule);
    //     let doctorName = buidDoctorName(timeSchedule);
    //     let numberPhone = `+84${+phoneNumber}`;
    //     console.log("check numberPhone: ", numberPhone)
    //     let data = {
    //         fullName: name,
    //         phoneNumber: numberPhone,
    //         email: email,
    //         address: address,
    //         reason: description,
    //         date: timeSchedule.date,
    //         birthday: dateFinalContract,
    //         selectedGender: selectedGender,
    //         doctorId: inforDoctor.id,
    //         timeType: timeSchedule.timeType,
    //         language: language,
    //         timeString: timeString,
    //         doctorName: doctorName
    //     }

    //     setLoading(true);

    //     try {
    //         let res = await postPatientBooking(data)

    //         await postSendSMS({
    //             phoneNumber: numberPhone
    //         })

    //         if (res && res.errCode === 0) {
    //             dispatch(addSuccessMessage({ title: "Đặt lịch thành công", content: "Vui lòng truy cập email để xác nhận" }));
    //             srollToInput();
    //         } else if (res && res.errCode === 2) {
    //             dispatch(addWarningMessage({ title: "Đặt lịch không thành công", content: "Khung giờ không trống!!! Vui lòng chọn khung giờ khác!!" }));
    //             srollToInput();
    //         }
    //         setLoading(false);
    //         console.log("Check booking successful", res);
    //     } catch (error) {
    //         dispatch(addErrorMessage({ title: "Đã có lỗi xảy ra", content: "Vui lòng thử lại sau!!!" }))
    //         setLoading(false);
    //         console.log("Faild API a book apointment", error);
    //     }
    // }

    const handleClose = () => {
        navigate(`/`);
    }

    const handlePayment = () => {

    }

    return (
        <MainLayout>
            <div>
                <div className="bg-[#e6eeee] ">
                    <div className="py-3 flex w-[60%] mx-auto gap-[3%] items-center">
                        <img
                            src={inforDoctor.image} alt={inforDoctor.id}
                            className="w-[100px] h-[100px] rounded-[50%]"
                        />
                        <div className="leading-6">
                            <h4 className="uppercase text-[15px]">{t('bookingschedule.titles')}</h4>
                            <h2 className="font-bold text-[#16917c] text-[18px]">{language === "vi" ? nameVi : nameEn}</h2>
                            <p>{date}</p>
                        </div>
                    </div>
                </div>
                <h2 className="text-[30px] text-[#16917c] text-center font-bold my-5 uppercase ">{t('bookingschedule.title1')}</h2>
                <div className="w-[60%] mx-auto my-3">
                    <div className="flex text-[17px] items-center">
                        {!checkIfVerifiedExists(inforDoctor) && (
                            <>
                                <i><ion-icon name="cash-outline"></ion-icon></i>
                                <h2 className="mx-2">{t('bookingschedule.price')} :</h2>
                                <h2>{language === 'vi'
                                    ? getFormattedPriceVND(inforDoctor.Doctor_Infor.priceTypeData.value_Vi)
                                    : getFormattedPriceUSD(inforDoctor.Doctor_Infor.priceTypeData.value_En)}
                                </h2>
                            </>
                        )
                        }

                    </div>
                    <form ref={formref}>
                        <div>
                            <div className="grid grid-cols-2 gap-[5%]">
                                <CommonInput
                                    field={t('bookingschedule.name')}
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={t('bookingschedule.phdername')}
                                    maxLength={50}
                                    error={error.name}
                                    required
                                />
                                <EmailInput
                                    field="Email"
                                    name="email"
                                    email={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('bookingschedule.phderemail')}
                                    maxLength={50}
                                    error={error.email}
                                    required
                                />

                            </div>
                            <CommonInput
                                field={t('bookingschedule.address')}
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder={t('bookingschedule.phderaddress')}
                                maxLength={100}
                                error={error.address}
                                required
                            />
                            <div className="grid grid-cols-3 gap-[5%] mt-4">
                                <PhoneInput
                                    field={t('bookingschedule.phone')}
                                    name="phoneNumber"
                                    phoneNumber={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder={t('bookingschedule.phderphonenumber')}
                                    maxLength={50}
                                    error={error.phoneNumber}
                                    required
                                />
                                <BirthdayInput
                                    field={t('bookingschedule.birthday')}
                                    onChange={(e) => setDateFinalContract(e.target.value)}
                                    date={dateFinalContract}
                                />
                                <div className="mb-4">
                                    <label className="font-bold text-[20px]">{t('bookingschedule.gender')}</label>
                                    <span className="text-red-600">*</span>
                                    <select
                                        onChange={(e) => {
                                            setSelectedGender(e.target.value);
                                        }}
                                        value={selectedGender}
                                        className="w-full rounded-[4px] px-2 border-b-2 border-[#003985] placeholder-shown:border-gray-500 focus:outline-none h-[40px]"
                                    >
                                        {GENDER_OPTIONS
                                            .map((option) => (
                                                <option
                                                    value={option.value}
                                                    key={option.value}
                                                // selected={option.value === selectedGender}
                                                >
                                                    {language === 'vi' ? option.label.vi : option.label.en}
                                                </option>
                                            ))}
                                    </select>

                                </div>
                            </div>
                            <div className='mb-6'>
                                <label className="font-bold text-[20px] inline-block">{t('bookingschedule.description')}</label>
                                <span className="text-red-600">*</span>
                                {error.description && <span className="text-red-600">{error.description}</span>}
                                <textarea className=' form-control block mt-2 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                                                 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                                    rows="4"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    placeholder={t('bookingschedule.phderdescription')}
                                >
                                </textarea>
                            </div>

                        </div>
                    </form>
                    <div>
                        <h2 className="text-[20px] font-bold mb-4">Phương thức thanh toán</h2>
                        <PaymentMethodSection
                        // paymentMethod={paymentMethod}
                        // bankCodeZalo={bankCodeZalo}
                        // handlePaymentMethod={(value) => setPaymentMethod(value)}
                        // handleBankCodeZalo={(value) => setBankCodeZalo(value)}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button onClick={handlePayment} className="bg-[#003985] text-white text-[18px] font-medium px-4 py-2 mb-12 mt-2 rounded-[5px] mx-2">{t('bookingschedule.save')}</button>
                        <button onClick={handleClose} className="bg-red-600 text-white text-[18px] font-medium px-4 py-2 mb-12 mt-2 rounded-[5px]">{t('bookingschedule.close')}</button>
                    </div>

                </div>

            </div>
        </MainLayout>
    )
}

export default withNamespaces()(BookingSchedule);