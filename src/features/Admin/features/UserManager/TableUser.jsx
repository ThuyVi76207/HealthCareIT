import { useEffect, useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserService, getAllUsers } from 'services/adminService';
import 'features/Admin/components/StylesCommon/TableManagerStyles.scss';
import {
  addErrorMessage,
  addSuccessMessage,
  addWarningMessage,
} from 'reducers/messageSlice';
import Loading from 'components/Loading/loading';

import { useNavigate } from 'react-router-dom';
import { addInfor } from 'reducers/editcommonSlice';
import { getUrlDynamic } from 'features/Admin/components/Auth';
import { ROLE_OPTIONS } from 'constants';

const TableUser = ({ t }) => {
  const { language } = useSelector((state) => state.user) || {};

  const rolID = sessionStorage.getItem('role');
  const userProfile = JSON.parse(localStorage.getItem(`${rolID}`));

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [listUsers, setListUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const printUser = async () => {
      try {
        const resUser = await getAllUsers('ALL');
        if (resUser && resUser.errCode === 0) {
          setLoading(false);
          setListUsers(resUser.users);
        }
      } catch (error) {
        alert('Faild get API get all user');
        // console.log("Faild get API get all user", error);
      }
    };

    printUser();
  }, [reload]);

  const handleDeleteUser = async (item) => {
    setLoading(true);
    try {
      let res = await deleteUserService(item.id);
      if (res && res.errCode === 0) {
        dispatch(
          addSuccessMessage({
            title: 'Xóa thành công',
            content: 'Đã xóa thành công người dùng!!!',
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
    } catch (error) {
      setLoading(false);
      dispatch(
        addErrorMessage({
          title: 'Đã có lỗi xảy ra',
          content: 'Vui lòng thử lại sau!!!',
        })
      );
      alert('Faild api delete user');
      // console.log('Faild api delete user', error);
    }
  };

  //   console.log("Check list user", listUsers);

  const handleEditUser = (user) => {
    dispatch(addInfor(user));
    let userUrl = getUrlDynamic(userProfile.roleId);
    navigate(`/manager/system/${userUrl}/usermanager/edit/${user.id}`);
  };

  return (
    <>
      <Loading loading={loading} />
      <table id="tableManager">
        <tbody>
          <tr className="uppercase">
            <th>STT</th>
            <th>{t('tableuser.name')}</th>
            <th>Email</th>
            <th>{t('tableuser.address')}</th>
            <th>{t('tableuser.phone')}</th>
            <th>Vai trò</th>
            <th>{t('tableuser.choose')}</th>
          </tr>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              let nameVi = `${item.lastName} ${item.firstName}`;
              let nameEn = ` ${item.firstName} ${item.lastName} `;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{language === 'vi' ? nameVi : nameEn}</td>
                  <td>{item.email}</td>
                  <td className="w-[25%] overflow-hidden">{item.address}</td>
                  <td>{item.phonenumber}</td>
                  <td>
                    {ROLE_OPTIONS.map((i, ind) => {
                      return i.value === item.roleId ? (
                        <p key={ind}>
                          {language === 'vi' ? i.label.vi : i.label.en}
                        </p>
                      ) : (
                        ''
                      );
                    })}
                  </td>
                  <td className="text-center">
                    <button
                      className="mr-2 hover:text-orange-400"
                      onClick={() => handleEditUser(item)}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button
                      className="hover:text-red-600"
                      onClick={() => handleDeleteUser(item)}
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

export default withNamespaces()(TableUser);
