import { useEffect, useState } from 'react';
import { getAllSpecialty } from 'services/userService';
import 'features/Admin/components/StylesCommon/TableManagerStyles.scss';
import { withNamespaces } from 'react-i18next';
import { convertDateToDateTime } from 'function/formater';
import { deleteSpecialtyService } from 'services/adminService';
import { useDispatch } from 'react-redux';
import {
  addErrorMessage,
  addSuccessMessage,
  addWarningMessage,
} from 'reducers/messageSlice';
import Loading from 'components/Loading/loading';
import { addInfor } from 'reducers/editcommonSlice';
import { useNavigate } from 'react-router-dom';
import { getUrlDynamic } from 'features/Admin/components/Auth';

const TableSpecialty = ({ t }) => {
  const navigate = useNavigate();

  const rolID = sessionStorage.getItem('role');
  const userProfile = JSON.parse(localStorage.getItem(`${rolID}`));

  const dispatch = useDispatch();
  const [listspecialty, setListSpecialty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setLoading(true);
    const printSpecialtyAll = async () => {
      try {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
          // console.log('Check api specialty: ', res.data);
          setListSpecialty(res.data);
          setLoading(false);
        }
      } catch (error) {
        alert('Faild to print API all specialty error');
        // console.log('Faild to print API all specialty error: ', error);
      }
    };

    printSpecialtyAll();
  }, [reload]);

  const handleDeleteSpecialty = async (item) => {
    setLoading(true);
    try {
      let res = await deleteSpecialtyService(item.id);
      if (res && res.errCode === 0) {
        dispatch(
          addSuccessMessage({
            title: 'Xóa thành công',
            content: 'Đã xóa thành công chuyên khoa!!!',
          })
        );
        setReload(!reload);
      } else if (res && res.errCode === 2) {
        dispatch(
          addWarningMessage({
            title: 'Xóa không thành công',
            content: 'Vui lòng kiểm tra lại!!!',
          })
        );
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      dispatch(
        addErrorMessage({
          title: 'Đã có lỗi xảy ra',
          content: 'Vui lòng thử lại sau!!!',
        })
      );
      console.error('Faild api delete specialty', err);
    }
  };

  const handleEditSpecialty = (specialty) => {
    dispatch(addInfor(specialty));
    let userUrl = getUrlDynamic(userProfile.roleId);
    navigate(
      `/manager/system/${userUrl}/specialtymanager/edit/${specialty.id}`
    );
  };

  return (
    <>
      <Loading loading={loading} />
      <table id="tableManager">
        <tbody>
          <tr className="uppercase">
            <th>STT</th>
            <th>{t('tablespecialty.name')}</th>
            <th>{t('tablespecialty.daycreate')}</th>
            <th>{t('tablespecialty.dayupdate')}</th>
            <th>{t('tablespecialty.choose')}</th>
          </tr>

          {listspecialty &&
            listspecialty.length > 0 &&
            listspecialty.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{convertDateToDateTime(item.createdAt)}</td>
                  <td>{convertDateToDateTime(item.updatedAt)}</td>
                  <td className="text-center">
                    <button
                      className="mr-2 hover:text-orange-400"
                      onClick={() => handleEditSpecialty(item)}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button
                      className="hover:text-red-600"
                      onClick={() => handleDeleteSpecialty(item)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default withNamespaces()(TableSpecialty);
