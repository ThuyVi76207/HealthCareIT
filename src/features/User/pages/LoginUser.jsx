import React, { useRef, useState } from "react"
import bgLogin from "assets/Login/bg.svg";
import wave from "assets/Login/wave.png";
import avatar from "assets/Login/avatar.svg";
import EmailInput from "features/Admin/components/Input/EmailInput";
import { withNamespaces } from "react-i18next";
import { isPasswordStrength, isValidEmail } from "function/formater";
import PasswordInput from "features/Admin/components/Input/PasswordInput";
import { handleLoginApi } from "services/userService";
import { useDispatch } from "react-redux";
import { addErrorMessage, addSuccessMessage, addWarningMessage } from "reducers/messageSlice";
import { useNavigate } from "react-router-dom";
const LoginUser = ({ t }) => {
    const dispatch = useDispatch();
    const formRef = useRef(null);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

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
        if (password === "") {
            validated = false;
            _error.password = "Vui lòng nhập mật khẩu";
        } else if (!isPasswordStrength(password)) {
            validated = false;
            _error.password = "Mật khẩu phải có đủ 8 ký tự bao gồm chữ thường, in hoa và số";
        }

        setError(_error);
        return validated;
    };


    const srollToInput = () => {
        formRef.current.scrollIntoView();
    }

    const handleLoginOnClick = () => {
        if (loading) return;
        handleLogin();
    };

    const handleLogin = async () => {
        if (!isValidated()) return srollToInput();

        setLoading(true);
        try {
            let res = await handleLoginApi(email, password);
            console.log('Check results login', res)
            if (res && res.errCode === 0) {
                dispatch(addSuccessMessage({ title: "Đăng nhập thành công", content: "Chào mừng bạn đến với HealthCare" }));
                navigate(`/`)
            } else if (res && res.errCode === 1) {
                dispatch(addWarningMessage({ title: "Email không tồn tại", content: "Vui lòng kiểm tra lại!!!" }));
                srollToInput();
            } else if (res && res.errCode === 2) {
                dispatch(addWarningMessage({ title: "Không tìm thấy user", content: "Vui lòng kiểm tra lại!!!" }));
                srollToInput();
            } else if (res && res.errCode === 3) {
                dispatch(addWarningMessage({ title: "Mật khẩu không đúng", content: "Vui lòng kiểm tra lại!!!" }));
                srollToInput();
            }

            setLoading(false);

        } catch (err) {
            dispatch(addErrorMessage({ title: "Đã có lỗi xảy ra", content: "Vui lòng thử lại sau!!!" }))
            setLoading(false);
            console.log("Faild to login user", err);
        }
    }

    return (
        <div className="relative ">
            <div className="w-[80%] mt-[50px] left-[10%] rounded-[10px] absolute shadow-[0_2px_10px_1px_rgba(0,0,0,0.3)] z-10">

                <img className="absolute rounded-[10px] h-full -z-10" src={wave} alt="hinh" />
                <div className="grid grid-cols-2 gap-28 pl-16 pr-8">
                    <div className="flex justify-end items-center">
                        <img className="w-[500px]" src={bgLogin} alt="anh" />
                    </div>
                    <div className="flex justify-start items-center">
                        <div>
                            <form ref={formRef} className="w-[380px] flex flex-col gap-[10px]">
                                <img src={avatar} alt="avatar" className="h-[120px] mt-16" />
                                <h2 className="uppercase text-[2.9rem] font-bold text-[#333] text-center my-[15px]">{t('login.titles')}</h2>
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
                                <PasswordInput
                                    field={t('createuser.password')}
                                    name="password"
                                    password={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={t('createuser.phderpassword')}
                                    error={error.password}
                                    required
                                />
                                <a href="/" className="text-right text-gray-500">{t('login.forgotpassword')} ?</a>

                            </form>
                            <div className="flex justify-center">
                                <button onClick={handleLoginOnClick} className="bg-[#16917c] w-[70%] py-3 px-2 my-5 rounded-[50px] text-white">{t('login.btn')}</button>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default withNamespaces()(LoginUser);