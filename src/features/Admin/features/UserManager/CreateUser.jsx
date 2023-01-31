
import { TITLE_OPTIONS } from "constants";
import { ROLE_OPTIONS } from "constants";
import { GENDER_OPTIONS } from "constants";
import CommonInput from "features/Admin/components/Input/CommonInput";
import EmailInput from "features/Admin/components/Input/EmailInput";
import PasswordInput from "features/Admin/components/Input/PasswordInput";
import ManagerLayout from "features/Admin/layouts/ManagerLayout";
import { isValidEmail, isValidPhoneNumber } from "function/formater";
import { useState } from "react";
import { withNamespaces } from "react-i18next";
import { useSelector } from "react-redux";

const CreateUser = ({ t }) => {

    const { language } = useSelector((state) => state.user) || {};

    const [error, setError] = useState({
        lastName: "",
        firstName: "",
        email: "",
        phoneNumber: "",
        selectedGender: "",
        address: "",
        selectedTitle: "",
        selectedRole: "",
        password: "",
        rePassword: "",
    })

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [selectedGender, setSelectedGender] = useState("M");
    const [optionGenders, setOptionGenders] = useState(GENDER_OPTIONS);
    const [selectedTitle, setSelectedTitle] = useState("");
    const [optionTitle, setOptionTitle] = useState(TITLE_OPTIONS);
    const [selectedRole, setSelectedRole] = useState("");
    const [optionRole, setOptionRole] = useState(ROLE_OPTIONS);
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [showImg, setShowImg] = useState();


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
        } else if (isValidPhoneNumber(phoneNumber)) {
            validated = false;
            _error.phoneNumber = "Số điện thoại không hợp lệ"
        }
        if (selectedGender === "") {
            validated = false;
            _error.selectedGender = "Vui lòng chọn giới tính";
        };
        if (address === "") {
            validated = false;
            _error.address = "Vui lòng nhập địa chỉ"
        }
        if (selectedTitle === "") {
            validated = false;
            _error.selectedTitle = "Vui lòng chọn chức danh";
        }
        if (selectedRole === "") {
            validated = false;
            _error.selectedRole = "Vui lòng chọn vai trò";
        }
        if (password === "") {
            validated = false;
            _error.password = "Vui lòng chọn nhập mật khẩu";
        }
        if (rePassword === "") {
            validated = false;
            _error.rePassword = "Vui lòng chọn nhập mật khẩu";
        }

        setError(_error);
        return validated;
    };

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

    console.log('Check gender', selectedGender);

    return (
        <ManagerLayout>
            {/* <Loading loading={loading} /> */}
            <div>{t('createuser.titles')}</div>
            <form>
                <div className="px-12 grid grid-cols-2 gap-[10%]">
                    <CommonInput
                        field={t('createuser.lastname')}
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Vui lòng nhập họ bao gồm tên lót..."
                        maxLength={50}
                        error={error.lastName}
                        required
                    />
                    <CommonInput
                        field={t('createuser.firstname')}
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Vui lòng nhập tên..."
                        maxLength={50}
                        error={error.firstName}
                        required
                    />
                    <EmailInput
                        field="Email"
                        name="email"
                        email={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Vui lòng nhập địa chỉ email..."
                        maxLength={50}
                        error={error.email}
                        required
                    />
                    <EmailInput
                        field={t('createuser.phone')}
                        name="phoneNumber"
                        email={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Vui lòng nhập số điện thoại..."
                        maxLength={50}
                        error={error.email}
                        required
                    />

                </div>

                <div className="px-12 flex gap-[10%] mt-7">
                    <div className="mb-4 w-[20%]">
                        <label className="font-bold text-[20px]">{t('createuser.gender')}</label>
                        <span className="text-red-600">*</span>
                        <select
                            onChange={(e) => {
                                setSelectedGender(e.target.value);
                            }}
                            value={selectedGender}
                            className="w-full rounded-[4px] px-2 border-b-2 border-[#003985] placeholder-shown:border-gray-500 focus:outline-none h-[40px]"
                        >
                            {optionGenders
                                .map((option) => (
                                    <option
                                        value={option.value}
                                        key={option.value}
                                        selected={option.value === selectedGender}
                                    >
                                        {language === 'vi' ? option.label.vi : option.label.en}
                                    </option>
                                ))}
                        </select>
                        {error.selectedGender && <span className="text-red-600">{error.selectedGender}</span>}
                    </div>
                    <div className="w-[70%]">
                        <CommonInput
                            field={t('createuser.address')}
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Vui lòng nhập địa chỉ"
                            maxLength={100}
                            error={error.address}
                            required
                        />
                    </div>

                </div>

                <div className="px-12 grid grid-cols-2 gap-[10%] pt-4">
                    <div className="mb-4">
                        <label className="font-bold text-[20px]">{t('createuser.title')}</label>
                        <span className="text-red-600">*</span>
                        <select
                            onChange={(e) => {
                                setSelectedTitle(e.target.value);
                            }}
                            value={selectedTitle}
                            className="w-full rounded-[4px] px-2 border-b-2 border-[#003985] placeholder-shown:border-gray-500 focus:outline-none h-[40px]"
                        >
                            {optionTitle
                                .map((option) => (
                                    <option
                                        value={option.value}
                                        key={option.value}
                                        selected={option.value === selectedTitle}
                                    >
                                        {language === 'vi' ? option.label.vi : option.label.en}
                                    </option>
                                ))}
                        </select>
                        {error.selectedTitle && <span className="text-red-600">{error.selectedTitle}</span>}
                    </div>

                    <div className="mb-4">
                        <label className="font-bold text-[20px]">{t('createuser.role')}</label>
                        <span className="text-red-600">*</span>
                        <select
                            onChange={(e) => {
                                setSelectedRole(e.target.value);
                            }}
                            value={selectedRole}
                            className="w-full rounded-[4px] px-2 border-b-2 border-[#003985] placeholder-shown:border-gray-500 focus:outline-none h-[40px]"
                        >
                            {optionRole
                                .map((option) => (
                                    <option
                                        value={option.value}
                                        key={option.value}
                                        selected={option.value === selectedRole}
                                    >
                                        {language === 'vi' ? option.label.vi : option.label.en}
                                    </option>
                                ))}
                        </select>
                        {error.selectedRole && <span className="text-red-600">{error.selectedRole}</span>}
                    </div>
                </div>

                <div className="px-12 grid grid-cols-2 gap-[10%]">
                    <PasswordInput
                        field={t('createuser.password')}
                        name="password"
                        password={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Vui lòng nhập mật khẩu..."
                        error={error.password}
                        required
                    />
                    <PasswordInput
                        field={t('createuser.repassword')}
                        name="repassword"
                        password={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        placeholder="Vui lòng nhập lại mật khẩu..."
                        error={error.rePassword}
                        required
                    />
                    <div className="mb-4">
                        <button type="button" name="upload" className="border font-bold py-2 px-2 mr-5 mb-2 hover:opacity-80 hover:cursor-pointer rounded-[4px] text-[13px]">
                            <input
                                className="w-[300px] h-[50px]"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e)}
                            />
                        </button>
                    </div>
                </div>

            </form>



        </ManagerLayout>
    )
}

export default withNamespaces()(CreateUser);