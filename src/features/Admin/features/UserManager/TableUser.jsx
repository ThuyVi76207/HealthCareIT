import { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { useSelector } from "react-redux";
import { getAllUsers } from "services/adminService";
import './TableUserStyles.scss';

const TableUser = ({ t }) => {
    const { language } = useSelector((state) => state.user) || {};

    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        const printUser = async () => {
            try {
                const resUser = await getAllUsers('ALL');
                if (resUser && resUser.errCode === 0)
                    setListUsers(resUser.users)
            } catch (error) {
                console.log('Faild get API get all user', error)
            }

        }

        printUser();
    }, [])

    console.log('Check list user', listUsers)

    return (
        <table id="tableManageUser">
            <tbody>
                <tr className="uppercase">
                    <th>STT</th>
                    <th>{t('tableuser.name')}</th>
                    <th>Email</th>
                    <th>{t('tableuser.address')}</th>
                    <th>{t('tableuser.phone')}</th>
                    <th>{t('tableuser.choose')}</th>
                </tr>
                {listUsers && listUsers.length > 0 &&
                    listUsers.map((item, index) => {

                        let nameVi = `${item.lastName} ${item.firstName}`;
                        let nameEn = ` ${item.firstName} ${item.lastName} `;
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{language === 'vi' ? nameVi : nameEn}</td>
                                <td>{item.email}</td>
                                <td>{item.address}</td>
                                <td>{item.phonenumber}</td>
                                <td>
                                    {/* <button className="btn-edit"
                                            onClick={() => this.handleEditUser(item)}
                                        ><i className="fas fa-pencil-alt"></i></button>
                                        <button className="btn-delete"
                                            onClick={() => this.handleDeleteUser(item)}
                                        ><i className="fas fa-trash"></i></button> */}
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default withNamespaces()(TableUser)