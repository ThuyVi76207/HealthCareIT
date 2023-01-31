import { GENDER_OPTIONS } from "constants/gender";
import CommonInput from "features/Admin/components/Input/CommonInput";
import EmailInput from "features/Admin/components/Input/EmailInput";
import ManagerLayout from "features/Admin/layouts/ManagerLayout";
import { isValidEmail, isValidPhoneNumber } from "function/formater";
import { useState } from "react";
import { withNamespaces } from "react-i18next";

const CreateUser = ({ t }) => {

    const [error, setError] = useState({
        lastName: "",
        firstName: "",
        email: "",
        phoneNumber: "",
        selectedGender: "",
    })

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [selectedGender, setSelectedGender] = useState(null);
    const [optionGenders, setOptionGenders] = useState(GENDER_OPTIONS);


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
            _error.selectedGender = "Vui lòng chọn loại xe";
        };

        setError(_error);
        return validated;
    };

    return (
        <ManagerLayout>
            {/* <Loading loading={loading} /> */}
            <div>Create User</div>
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
                    <div className="mb-5 px-5">
                        <label className="font-bold">{t('createuser.gender')}</label>
                        <span className="text-red-600 text-[20px]">*</span>
                        <select
                            onChange={(e) => {
                                setSelectedGender(e.target.value);
                            }}
                            value={selectedGender}
                            className="w-full rounded-[4px] px-2 border-b-2 border-[#003985] placeholder-shown:border-gray-500 focus:outline-none h-[40px] mt-4"
                        >
                            {optionGenders
                                .map((option) => (
                                    <option
                                        value={option.value}
                                        key={option.value}
                                        selected={option.value === selectedGender}
                                    >
                                        {console.log("Check gender:", option)}
                                    </option>
                                ))}
                        </select>
                        {error.selectedGender && <span className="text-red-600">{error.selectedCarType}</span>}
                    </div>
                </div>

            </form>



        </ManagerLayout>
    )
}

export default withNamespaces()(CreateUser);