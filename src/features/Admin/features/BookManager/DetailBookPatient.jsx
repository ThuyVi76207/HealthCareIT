import Loading from 'components/Loading/loading';
import { TIMELINE_OPTIONS } from 'constants';
import ManagerLayout from 'features/Admin/layouts/ManagerLayout';
import { useEffect, useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  addErrorMessage,
  addSuccessMessage,
  addWarningMessage,
} from 'reducers/messageSlice';
import {
  deleteMultipleBooking,
  deleteOneBooking,
  postWarningBooking,
} from 'services/adminService';

const DetailBookPatient = ({ t }) => {
  const { language } = useSelector((state) => state.user) || {};
  const dispatch = useDispatch();
  const [listUserWarning, setListUserWarning] = useState([]);

  let urlParam = new URLSearchParams(window.location.search);
  let doctorId = urlParam.get('doctorId');
  let patientId = urlParam.get('patientId');
  // console.log("Check patientId", patientId, doctorId);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  const [listCheck, setListCheck] = useState([]);

  useEffect(() => {
    setLoading(true);
    const postWarningBookingPatient = async () => {
      let data = {
        doctorId: doctorId,
        patientId: patientId,
      };
      try {
        let res = await postWarningBooking(data);
        // console.log("Check doctorId", res);
        if (res && res.errCode === 0) {
          setListUserWarning(res.warningBooking);
          setLoading(false);
          dispatch(
            addWarningMessage({
              title: 'Cảnh báo người dùng đặt quá số lượng cho phép',
              content: 'Cần gọi điện xác nhận!!!!',
            })
          );
        } else if (res && res.errCode === 1) {
          setLoading(false);
          dispatch(
            addErrorMessage({
              title: 'Đã có lỗi xảy ra',
              content: 'Vui lòng thử lại sau!!!',
            })
          );
        }
        if (res && res.errCode === 2) {
          setLoading(false);
          dispatch(
            addSuccessMessage({
              title: 'Thông báo',
              content: 'Người dùng chưa đặt vượt giới hạn cho phép',
            })
          );
          setListUserWarning(res.warningBooking);
        }
      } catch (error) {
        setLoading(false);
        alert('Có lỗi xảy ra vui lòng thử lại sau!!!');
        // console.log('Faild to get API patient', error);
      }
    };
    postWarningBookingPatient();
  }, [reload, doctorId, patientId]);

  const reverseHours = (h) => {
    let hours = TIMELINE_OPTIONS;
    let hour;
    for (let i = 0; i < hours.length; i++) {
      if (hours[i].value === h) {
        if (language === 'vi') {
          // console.log('Check lít', hours[i].label.vi);
          hour = hours[i].label.vi;
        } else {
          // console.log('Check lít', hours[i].label.en);
          hour = hours[i].label.en;
        }
        return hour;
      }
    }
  };

  const handleDeleteOneBooking = async (item) => {
    // console.log("Check item", item)
    setLoading(true);
    try {
      await deleteOneBooking(item.id).then(function (data) {
        const items = data;
        if (items.errCode === 0) {
          setLoading(false);
          dispatch(
            addSuccessMessage({
              title: 'Xóa thành công',
              content: 'Đã xóa lịch đặt.',
            })
          );
          setReload(!reload);
        } else if (items.errCode === 2) {
          setLoading(false);
          dispatch(
            addErrorMessage({
              title: 'Xóa thất bại',
              content: 'Vui lòng thử lại sau',
            })
          );
        }
        setLoading(false);
        // console.log('check items', items);
      });
      // promiseResult(res);
      // console.log("Check res", res);
    } catch (error) {
      setLoading(false);
      alert(`Có lỗi xảy ra vui lòng thử lại sau`);
      //   console.log('Faild to API delete one booking', error);
    }
  };

  const handleMultipDelete = async () => {
    setLoading(true);
    try {
      let res = await deleteMultipleBooking(listCheck);
      //   console.log('Check res multip', res);
      if (res && res.errCode === 0) {
        setLoading(false);
        setReload(!reload);
        dispatch(
          addSuccessMessage({
            title: 'Xóa thành công',
            content: 'Đã xóa lịch đặt.',
          })
        );
      } else if (res && res.errCode === 1) {
        setLoading(false);
        dispatch(
          addErrorMessage({
            title: 'Xóa thất bại',
            content: 'Vui lòng thử lại sau',
          })
        );
      }
    } catch (error) {
      setLoading(false);
      alert(`Có lỗi xảy ra vui lòng thử lại sau`);
      //   console.log('Faild to API delete one booking', error);
    }
  };

  //  console.log('Check array list', listCheck);

  return (
    <ManagerLayout>
      <Loading loading={loading} />
      <div className="w-[95%] mx-auto py-6">
        <div className="py-3">
          <button
            className="border border-[#f4f4f4] py-2 px-4 float-right mb-4 hover:bg-[#035795] hover:text-white"
            onClick={handleMultipDelete}
          >
            Xóa tất cả
          </button>
        </div>
        <table id="tableManager">
          <tbody>
            <tr>
              <th>STT</th>
              <th>{t('detailbook.daybook')}</th>
              <th>{t('detailbook.hourbook')}</th>
              <th>{t('detailbook.status')}</th>
              <th>{t('detailbook.option')}</th>
            </tr>
            {listUserWarning &&
              listUserWarning.length > 0 &&
              listUserWarning.map((item, index) => {
                let formatdate = parseInt(item.date) + 25200000;
                let days = new Date(formatdate).toISOString().split('T')[0];
                let dayReverse = days.split(/\D/).reverse().join('/');
                // console.log('check item check', item);
                let hourReverse = reverseHours(item.timeType);
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{dayReverse}</td>
                    <td>{hourReverse}</td>
                    <td>{t('detailbook.statusnotverify')}</td>
                    <td className="">
                      <div className="flex justify-between w-[50%] mx-auto">
                        <input
                          className="w-[20px] h-[20px]"
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setListCheck([...listCheck, item.id]);
                            } else {
                              //filter những id khác id vừa check
                              setListCheck(
                                listCheck.filter((t) => t !== item.id)
                              );
                            }
                          }}
                          value={listCheck}
                        />
                        <button
                          className="hover:text-red-600"
                          onClick={() => handleDeleteOneBooking(item)}
                        >
                          <i className="fas fa-trash "></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </ManagerLayout>
  );
};

export default withNamespaces()(DetailBookPatient);
