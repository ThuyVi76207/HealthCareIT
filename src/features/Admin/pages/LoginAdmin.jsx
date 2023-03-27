import Loading from "components/Loading/loading";
import { isPasswordStrength, isValidEmail } from "function/formater";
import React, { useRef, useState } from "react";
import { withNamespaces } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addErrorMessage,
  addSuccessMessage,
  addWarningMessage,
} from "reducers/messageSlice";
import { handleLoginApi } from "services/userService";

const LoginAdmin = ({ t }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({
    email: "",
    password: "",
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
      _error.password =
        "Mật khẩu phải có đủ 8 ký tự bao gồm chữ thường, in hoa và số";
    }

    setError(_error);
    return validated;
  };

  const srollToInput = () => {
    formRef.current.scrollIntoView();
  };

  const handleLoginOnClick = () => {
    if (loading) return;
    handleLogin();
  };

  const handleLogin = async () => {
    if (!isValidated()) return srollToInput();

    setLoading(true);
    try {
      let res = await handleLoginApi(email, password);

      // console.log('Check results login', res.data)
      if (res && res.errCode === 0) {
        let profiles = res.user;
        let user = { ...profiles, isLogin: true };
        dispatch(
          addSuccessMessage({
            title: "Đăng nhập thành công",
            content: "Chào mừng bạn đến với HealthCare",
          })
        );
        sessionStorage.setItem("role", `${res.user.roleId}`);
        localStorage.setItem(`${profiles.roleId}`, JSON.stringify(user));
        // dispatch(addProfileUser(res.user));
        navigate(`/manager/system`);
      } else if (res && res.errCode === 1) {
        dispatch(
          addWarningMessage({
            title: "Email không tồn tại",
            content: "Vui lòng kiểm tra lại!!!",
          })
        );
        srollToInput();
      } else if (res && res.errCode === 2) {
        dispatch(
          addWarningMessage({
            title: "Không tìm thấy user",
            content: "Vui lòng kiểm tra lại!!!",
          })
        );
        srollToInput();
      } else if (res && res.errCode === 3) {
        dispatch(
          addWarningMessage({
            title: "Mật khẩu không đúng",
            content: "Vui lòng kiểm tra lại!!!",
          })
        );
        srollToInput();
      }

      setLoading(false);
    } catch (err) {
      dispatch(
        addErrorMessage({
          title: "Đã có lỗi xảy ra",
          content: "Vui lòng thử lại sau!!!",
        })
      );

      setLoading(false);
      console.log("Faild to login user", err);
    }
  };

  return (
    <div className="bg-[#16917c] w-full h-[720px] relative">
      <Loading loading={loading} />
      <div className="w-[350px]  text-white absolute bg-[#1b2342] top-[20%] left-[40%] rounded-[10px] shadow-[0_2px_10px_1px_rgba(0,0,0,0.3)]">
        <h2 className="text-center text-[30px] font-bold my-8">
          {t("login.titlesad")}
        </h2>
        <form ref={formRef}>
          <div className="mx-6 border border-b-2 bg-[#1b2342] border-b-[#fff] border-[#526886] flex items-center rounded-[5px]">
            <i className="text-[18px] mt-1 ml-2">
              <ion-icon name="mail-outline"></ion-icon>
            </i>

            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder={t("login.phderemail")}
              maxLength={50}
              className="w-full px-2 rounded-[5px] bg-[#1b2342] focus:bg-[#1b2342]  placeholder-shown:border-gray-500 focus:outline-none h-[40px]"
            ></input>
          </div>
          {error.email && <p className="text-red-600 mx-6">{error.email}</p>}
          <div className="mx-6 mt-4 border-2  border-b-2 border-b-[#fff] border-[#526886] flex items-center rounded-[5px]">
            <i className="text-[18px] mt-1 ml-2">
              <ion-icon name="lock-closed-outline"></ion-icon>
            </i>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder={t("login.phderpassword")}
              maxLength={50}
              className="w-full rounded-[4px] px-2 bg-[#1b2342] placeholder-shown:border-gray-500 focus:outline-none h-[40px]"
            ></input>
          </div>
          {error.password && (
            <p className="text-red-600 mx-6">{error.password}</p>
          )}
        </form>
        <br />
        <a
          href="/manager/login"
          className="mx-6 text-[#16917c] text-[16px] font-semibold"
        >
          {t("login.forgotpassword")} ?
        </a>
        <div className="flex justify-center mx-6">
          <button
            onClick={handleLoginOnClick}
            className="bg-[#16917c] w-full py-3 px-2 my-5 rounded-[5px] text-white text-[16px]"
          >
            {t("login.btn")}
          </button>
        </div>
        <h2 className="text-center mt-2 mb-6">{t("login.make")}</h2>
      </div>
    </div>
  );
};

export default withNamespaces()(LoginAdmin);
