import { useEffect, useState } from 'react';
import { getAllDoctors } from 'services/adminService';
import 'features/Admin/components/StylesCommon/TableManagerStyles.scss';
import { withNamespaces } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUrlDynamic } from 'features/Admin/components/Auth';

const TableDoctor = ({ t }) => {
  const navigate = useNavigate();

  const rolID = sessionStorage.getItem('role');
  const userProfile = JSON.parse(localStorage.getItem(`${rolID}`));

  const { language } = useSelector((state) => state.user) || {};

  const [listDoctor, setListDoctor] = useState([]);

  useEffect(() => {
    const getListDoctor = async () => {
      try {
        let res = await getAllDoctors();
        if (res && res.errCode === 0) {
          // console.log("Check list doctor", res.data);
          setListDoctor(res.data);
        }
      } catch (error) {
        alert('Faild to get list of Doctor');
        // console.log('Faild to get list of Doctor', error)
      }
    };

    getListDoctor();
  }, []);

  const handleEditInforDoctor = (infordoctor) => {
    let userUrl = getUrlDynamic(userProfile.roleId);
    navigate(
      `/manager/system/${userUrl}/doctormanager/edit-information-doctor/${infordoctor.id}`
    );
  };

  return (
    <table id="tableManager">
      <tbody>
        <tr>
          <th>STT</th>
          <th>{t('tabledoctor.name')}</th>
          <th>Email</th>
          <th>{t('tabledoctor.address')}</th>
          <th>{t('tabledoctor.phone')}</th>
          <th>{t('tabledoctor.choose')}</th>
        </tr>
        {listDoctor &&
          listDoctor.length > 0 &&
          listDoctor.map((item, index) => {
            let nameVi = `${item.lastName} ${item.firstName}`;
            let nameEn = ` ${item.firstName} ${item.lastName} `;
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{language === 'vi' ? nameVi : nameEn}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.phonenumber}</td>
                <td className="text-center">
                  <button
                    className="hover:text-orange-600"
                    onClick={() => handleEditInforDoctor(item)}
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default withNamespaces()(TableDoctor);
