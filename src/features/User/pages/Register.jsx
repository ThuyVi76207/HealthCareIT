import React, { useRef, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import RegisterImg from "assets/Register/register.svg";
import CommonInput from "features/Admin/components/Input/CommonInput";
import { withNamespaces } from "react-i18next";
import { isPasswordStrength, isValidEmail, isValidPhoneNumber } from "function/formater";
import EmailInput from "features/Admin/components/Input/EmailInput";
import PhoneInput from "features/Admin/components/Input/PhoneInput";
import { GENDER_OPTIONS } from "constants";
import { useDispatch, useSelector } from "react-redux";
import PasswordInput from "features/Admin/components/Input/PasswordInput";
import { postRegister } from "services/userService";
import { addErrorMessage, addSuccessMessage, addWarningMessage } from "reducers/messageSlice";
import Loading from "components/Loading/loading";
import { useNavigate } from "react-router-dom";

const Register = ({ t }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formRef = useRef(null);
    const { language } = useSelector((state) => state.user) || {};

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedGender, setSelectedGender] = useState("M");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        lastName: "",
        firstName: "",
        email: "",
        phoneNumber: "",
        selectedGender: "",
        password: "",
        rePassword: "",
    });

    const isValidated = () => {
        let validated = true;
        let _error = {};
        if (lastName === "") {
            validated = false;
            _error.lastName = "Vui lòng nhập họ";
        }
        if (firstName === "") {
            validated = false;
            _error.firstName = "Vui lòng nhập tên";
        }
        if (email === "") {
            validated = false;
            _error.email = "Vui lòng nhập email";
        } else if (!isValidEmail(email)) {
            validated = false;
            _error.email = "Email không hợp lệ";
        }
        if (phoneNumber === "") {
            validated = false;
            _error.phoneNumber = "Vui lòng nhập số điện thoại"
        } else if (!isValidPhoneNumber(phoneNumber)) {
            validated = false;
            _error.phoneNumber = "Số điện thoại không hợp lệ"
        }
        if (selectedGender === "") {
            validated = false;
            _error.selectedGender = "Vui lòng chọn giới tính";
        };
        if (password === "") {
            validated = false;
            _error.password = "Vui lòng nhập mật khẩu";
        } else if (!isPasswordStrength(password)) {
            validated = false;
            _error.password = "Mật khẩu phải có đủ 8 ký tự bao gồm chữ thường, in hoa và số";
        }

        if (rePassword === "") {
            validated = false;
            _error.rePassword = "Vui lòng nhập mật khẩu";
        } else if (rePassword !== password) {
            validated = false;
            _error.rePassword = "Vui lòng nhập lại mật khẩu, mật khẩu không đúng";
        }

        setError(_error);
        return validated;
    }

    const srollToInput = () => {
        formRef.current.scrollIntoView();
    }
    const handleRegisterOnClick = () => {
        if (loading) return;
        handleRegister();
    };

    const handleNavigateLogin = () => {
        navigate(`/healthcare/login/user`);
    }

    const handleRegister = async () => {
        if (!isValidated()) return srollToInput();
        const data = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            gender: selectedGender,
            phonenumber: phoneNumber,

        };

        setLoading(true);
        try {
            let res = await postRegister(data);
            if (res && res.errCode === 0) {
                dispatch(addSuccessMessage({ title: "Đăng ký thành công", content: "Thêm thành công tài khoản người dùng" }));
                srollToInput();
            } else if (res && res.errCode === 1) {
                dispatch(addWarningMessage({ title: "Tài khoản đã tồn tại", content: "Vui lòng nhập email mới!!!" }));
                srollToInput();
            }
            setLoading(false);
            handleNavigateLogin();
            // console.log('Check res', res)
        } catch (error) {
            dispatch(addErrorMessage({ title: "Đã có lỗi xảy ra", content: "Vui lòng thử lại sau!!!" }))
            setLoading(false);
            console.log("Faild to register", error);
        }
    }
    return (
        <MainLayout>
            <Loading loading={loading} />
            <h2 className="text-[30px] font-bold text-[#16917c] text-center my-[50px]">{t('register.titles')}</h2>
            <div className="flex w-[80%] mx-auto">
                <div className="w-[60%]">
                    <form ref={formRef}>
                        <div className="grid grid-cols-2 gap-[10%]">
                            <CommonInput
                                field={t('createuser.lastname')}
                                name="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder={t('createuser.phderlastname')}
                                maxLength={50}
                                error={error.lastName}
                                required
                            />
                            <CommonInput
                                field={t('createuser.firstname')}
                                name="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder={t('createuser.phderfirstname')}
                                maxLength={50}
                                error={error.firstName}
                                required
                            />
                            <EmailInput
                                field="Email"
                                name="email"
                                email={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('createuser.phderemail')}
                                maxLength={50}
                                error={error.email}
                                required
                            />
                            <PhoneInput
                                field={t('createuser.phone')}
                                name="phoneNumber"
                                phoneNumber={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder={t('createuser.phderphonenumber')}
                                maxLength={50}
                                error={error.phoneNumber}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-[5%]">
                            <div className="mb-4">
                                <label className="font-bold text-[20px]">{t('createuser.gender')}</label>
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
                                {error.selectedGender && <span className="text-red-600">{error.selectedGender}</span>}
                            </div>
                            <PasswordInput
                                field={t('createuser.password')}
                                name="password"
                                password={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('createuser.phderpassword')}
                                error={error.password}
                                required
                            />
                            <PasswordInput
                                field={t('createuser.repassword')}
                                name="repassword"
                                password={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
                                placeholder={t('createuser.phderrepassword')}
                                error={error.rePassword}
                                required
                            />
                        </div>

                    </form>

                    <button onClick={handleRegisterOnClick} className="bg-[#003985] text-white text-[18px] font-medium px-4 py-2 mb-5 mt-3 rounded-[5px]">{t('register.save')}</button>



                </div>
                <div className="w-[40%]">
                    <img src={RegisterImg} alt="Ảnh đăng ký" />
                </div>
            </div>
        </MainLayout>
    )
}

export default withNamespaces()(Register);