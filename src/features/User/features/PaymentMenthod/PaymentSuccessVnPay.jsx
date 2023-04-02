import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { postReturnPaymentVNPay } from "services/userService";

const PaymentSuccessVnPay = () => {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [note, setNote] = useState("");
  const tokenID = localStorage.getItem("tokenID");
  const doctorId = localStorage.getItem("doctorId");
  useEffect(() => {
    const paymentSuccess = async () => {
      try {
        let res = await postReturnPaymentVNPay({
          doctorId: doctorId,
          token: tokenID
        });
        console.log(res);
      } catch (error) {
        alert("Đã có lỗi xảy ra");
      }
    };
    paymentSuccess();

    const message = searchParams.get("vnp_TransactionStatus");
    const resCode = searchParams.get("vnp_ResponseCode");
    const status = resCode === "00" ? "success" : "fail";
    setMessage(message);
    setStatus(status);
    setNote(getMsgFromOnePayResCode(resCode));
  }, []);

  const getMsgFromOnePayResCode = (resCode) => {
    switch (resCode) {
      case "00":
        return "Giao dịch thành công.";
      case "02":
        return "Merchant không hợp lệ (kiểm tra lại vnp_TmnCode)";
      case "03":
        return "Dữ liệu gửi sang không đúng định dạng.";
      case "07":
        return "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).";
      case "09":
        return "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.";
      case "10":
        return "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần";
      case "11":
        return "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.";
      case "12":
        return "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.";
      case "13":
        return "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.";
      case "24":
        return "Giao dịch không thành công do: Khách hàng hủy giao dịch";
      case "51":
        return "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.";
      case "65":
        return "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.";
      case "75":
        return "Ngân hàng thanh toán đang bảo trì.";
      case "79":
        return "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch";
      case "97":
        return "Ngân hàng thanh toán đang bảo trì.";
      case "99":
        return "Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)";
      default:
        return "Lỗi không xác định";
    }
  };

  const getClassColor = (status) => {
    if (status === "success") {
      return "green-600";
    }
    if (status === "fail") {
      return "red-600";
    }
    return "gray-600";
  };

  const getClassIcon = (status) => {
    if (status === "success") {
      return "fas fa-check";
    }
    if (status === "fail") {
      return "fas fa-times";
    }
    return "fas fa-check";
  };

  return (
    <div className="w-full h-screen flex items-center justify-center shadow mx-auto py-4 bg-white ">
      <div>
        <div
          className={`h-24 w-24 rounded-full bg-${getClassColor(
            status
          )} flex items-center justify-center mx-auto`}
        >
          <i className={`${getClassIcon(status)} text-white text-[45px]`}></i>
        </div>
        <div className="m-3 text-center text-xl leading-[40px] text-gray-600">
          <h2>
            Thanh toán đang ở trạng thái{" "}
            <b className={`text-${getClassColor(status)}`}>{message}</b>
          </h2>
          <p className="text-black font-semibold text-md">{note}</p>
        </div>
        <Link to={"/"}>
          <div className="text-center">
            <button
              className={`bg-gray-600 text-white text-[15px] text-center h-12 w-52 font-medium hover:opacity-80`}
            >
              QUAY VỀ TRANG CHỦ
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessVnPay;
