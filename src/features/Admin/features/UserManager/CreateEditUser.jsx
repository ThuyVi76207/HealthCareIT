
import ManagerLayout from "features/Admin/layouts/ManagerLayout";
import { isPasswordStrength, isValidEmail, isValidPhoneNumber } from "function/formater";
import { useMemo, useRef, useState } from "react";
import { withNamespaces } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addErrorMessage, addSuccessMessage, addWarningMessage } from "reducers/messageSlice";
import { createNewUserService, editUserService } from "services/adminService";
import { TITLE_OPTIONS } from "constants";
import { ROLE_OPTIONS } from "constants";
import { GENDER_OPTIONS } from "constants";
import CommonInput from "features/Admin/components/Input/CommonInput";
import EmailInput from "features/Admin/components/Input/EmailInput";
import PhoneInput from "features/Admin/components/Input/PhoneInput";
import PasswordInput from "features/Admin/components/Input/PasswordInput";
import Loading from "components/Loading/loading";
import { Buffer } from "buffer";
import { useNavigate, useParams } from "react-router-dom";

const CreateEditUser = ({ t }) => {
    const formRef = useRef(null);
    const { id } = useParams();
    const isAddMode = !id;
    // console.log('Check mode', isAddMode)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { language } = useSelector((state) => state.user) || {};
    const useredit = useSelector((state) => state.editcommon) || {};

    // console.log("Check your user", useredit);

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
    // const [optionGenders, setOptionGenders] = useState(GENDER_OPTIONS);
    const [selectedTitle, setSelectedTitle] = useState("P0");
    // const [optionTitle, setOptionTitle] = useState(TITLE_OPTIONS);
    const [selectedRole, setSelectedRole] = useState("R1");
    // const [optionRole, setOptionRole] = useState(ROLE_OPTIONS);
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [showImg, setShowImg] = useState();

    const [loading, setLoading] = useState(false);


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

    const srollToInput = () => {
        formRef.current.scrollIntoView();
    }

    const handleCreateUserOnClick = () => {
        if (loading) return;
        createNewUser();
    };
    const handleResetForm = () => {
        setLastName('');
        setFirstName('');
        setEmail('');
        setPassword('');
        setRePassword('');
        setPhoneNumber('');
        setAddress('');
        setShowImg();
    }
    const createNewUser = async () => {
        if (!isValidated()) return srollToInput();

        const data = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            address: address,
            gender: selectedGender,
            phonenumber: phoneNumber,
            roleId: selectedRole,
            positionId: selectedTitle,
            avatar: showImg,
        };

        setLoading(true);
        try {
            let res = await createNewUserService(data);
            // console.log('Check results', res)
            if (res && res.errCode === 0) {
                dispatch(addSuccessMessage({ title: "Tạo thành công", content: "Thêm thành công tài khoản người dùng" }));
                srollToInput();
            } else if (res && res.errCode === 1) {
                dispatch(addWarningMessage({ title: "Tài khoản đã tồn tại", content: "Vui lòng nhập email mới!!!" }));
                srollToInput();
            }
            setLoading(false);
            handleResetForm();
        } catch (error) {
            dispatch(addErrorMessage({ title: "Đã có lỗi xảy ra", content: "Vui lòng thử lại sau!!!" }))
            setLoading(false);
            console.log("Error create a new user", error);
        }
    }

    useMemo(() => {
        if (isAddMode) return;

        let imageBase64 = Buffer.from(useredit.image, 'base64').toString('binary');

        setLastName(useredit.lastName);
        setFirstName(useredit.firstName);
        setEmail(useredit.email);
        setPhoneNumber(useredit.phonenumber);
        setAddress(useredit.address);
        setShowImg(imageBase64);
        setSelectedGender(useredit.gender);
        setSelectedTitle(useredit.positionId);
        setSelectedRole(useredit.roleId);

    }, [isAddMode, useredit.lastName, useredit.firstName, useredit.email, useredit.phonenumber, useredit.address, useredit.image, useredit.gender, useredit.positionId, useredit.roleId])

    const handleEditUser = () => {
        if (loading) return;
        editUser();
    }

    const editUser = async () => {
        if (!isValidated()) return srollToInput();

        let data = {
            id: id,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            address: address,
            gender: selectedGender,
            phonenumber: phoneNumber,
            roleId: selectedRole,
            positionId: selectedTitle,
            avatar: showImg,
        }
        setLoading(true);
        try {
            let res = await editUserService(data);
            console.log('Check results edit', res)
            if (res && res.errCode === 0) {
                dispatch(addSuccessMessage({ title: "Lưu thành công", content: "Sửa thành công thông tin tài khoản người dùng" }));
                srollToInput();
            } else if (res && res.errCode === 2) {
                dispatch(addWarningMessage({ title: "Tài khoản không tồn tại", content: "Vui lòng kiểm tra lại!!!" }));
                srollToInput();
            }
            setLoading(false);
            navigate(`/manager/usermanager`);
        } catch (err) {
            dispatch(addErrorMessage({ title: "Đã có lỗi xảy ra", content: "Vui lòng thử lại sau!!!" }))
            setLoading(false);
            console.log("Faild to edit user", err);
        }
    }


    return (
        <ManagerLayout>
            <Loading loading={loading} />
            <h2 className="text-center text-[25px] font-bold py-12">{`${isAddMode ? t('createuser.titles') : t('edituser.titles')}`}</h2>
            <form ref={formRef} >
                <div className="px-12 grid grid-cols-2 gap-[10%]">
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
                    <div className="w-[70%]">
                        <CommonInput
                            field={t('createuser.address')}
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder={t('createuser.phderaddress')}
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
                            {TITLE_OPTIONS
                                .map((option) => (
                                    <option
                                        value={option.value}
                                        key={option.value}
                                    // selected={option.value === selectedTitle}
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
                            {ROLE_OPTIONS
                                .map((option) => (
                                    <option
                                        value={option.value}
                                        key={option.value}
                                    // selected={option.value === selectedRole}
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
                <div className="ml-12 mt-2">
                    {/* <label className="font-bold text-[20px]">{t('createuser.upload')}</label> */}
                    <button type="button" name="upload" className="bg-[#003985] text-white font-bold py-2 px-2 mr-5 mb-2 relative hover:opacity-80 hover:cursor-pointer rounded-[4px] text-[15px]">
                        <i className="mr-2 text-[15px]"><ion-icon name="cloud-upload-outline"></ion-icon></i>
                        {t('createuser.upload')}
                        <input
                            className="opacity-0 absolute w-full h-full top-0 left-0"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e)}
                        />

                    </button>
                    {showImg && <img src={showImg} className="w-[120px] h-[120px] mb-4" alt="" />}
                </div>
            </form>

            {
                isAddMode
                    ?
                    <button onClick={handleCreateUserOnClick} className="bg-[#003985] text-white text-[18px] font-medium px-4 py-2 mb-5 mt-2 mx-12  rounded-[5px]">{t('createuser.save')}</button>

                    :
                    <button onClick={handleEditUser} className="bg-[#003985] text-white text-[18px] font-medium px-4 py-2 mb-5 mt-2 mx-12  rounded-[5px]">{t('createuser.save')}</button>

            }


        </ManagerLayout>
    )
}

export default withNamespaces()(CreateEditUser);