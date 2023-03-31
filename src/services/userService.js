import axiosClient from "api/axiosClient";

//Register
const postRegister = (data) => {
  return axiosClient.post("/api/auth/register", data);
};

//Login
const handleLoginApi = (email, password) => {
  return axiosClient.post("/api/login", { email, password });
};

//Specialty
const getAllSpecialty = () => {
  return axiosClient.get("/api/get-specialty");
};
const getAllSpecialtyById = (data) => {
  return axiosClient.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};
const getSettingService = (type) => {
  return axiosClient.get(`/api/settings?type=${type}`);
};

//Doctor
const getTopDoctorHomeService = (limit) => {
  return axiosClient.get(`/api/top-doctor-home?limit=${limit}`);
};
const getProfileDoctorById = (doctorId) => {
  return axiosClient.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axiosClient.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getDetailInforDoctor = (inputId) => {
  return axiosClient.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

//News
const getAllNews = (limit) => {
  return axiosClient.get(`/api/get-news?limit=${limit}`);
};
const getAllNewsById = (data) => {
  return axiosClient.get(`/api/get-detail-news-by-id?id=${data.id}`);
};

//Booking
const postPatientBooking = (data) => {
  return axiosClient.post("/api/patient-booking-appointment", data);
};
const postVerifyBooking = (data) => {
  return axiosClient.post("/api/verify-booking-appointment", data);
};
const postSendPrescription = (data) => {
  return axiosClient.post(`/api/send-prescription`, data);
};
const postSendRoomID = (data) => {
  return axiosClient.post(`/api/send-roomID`, data);
};

const getBookingInfo = () => {
  return axiosClient.get(`/api/get-booking-info`);
};
//SMS
const postSendSMS = (data) => {
  return axiosClient.post(`/api/sendSMS`, data);
};

//Payment Paypal
const postPaymentPaypal = (price) => {
  return axiosClient.post(`/api/pay-paypal`, { price });
};
const successPay = (data) => {
  return axiosClient.post(`/success`, data);
};

//Payment VNPay
const postPaymentVNPay = (amount) => {
  return axiosClient.post(`/create_payment_url`, { amount });
};
const postReturnPaymentVNPay = () => {
  return axiosClient.post(`/vnpay_return`);
};

//Room chat
const postSaveNameRoom = (data) => {
  return axiosClient.post(`/api/save-name-room`, data);
};
const getAllRoom = () => {
  return axiosClient.get(`/api/get-all-room`);
};

export {
  getAllSpecialty,
  getTopDoctorHomeService,
  getAllNews,
  getAllSpecialtyById,
  getSettingService,
  getProfileDoctorById,
  getScheduleDoctorByDate,
  getDetailInforDoctor,
  getAllNewsById,
  postPatientBooking,
  postSendSMS,
  postVerifyBooking,
  postPaymentPaypal,
  postRegister,
  handleLoginApi,
  successPay,
  postSendPrescription,
  getBookingInfo,
  postSendRoomID,
  postSaveNameRoom,
  getAllRoom,
  postPaymentVNPay,
  postReturnPaymentVNPay,
};
