import { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserService, getAllUsers } from "services/adminService";
import "features/Admin/components/StylesCommon/TableManagerStyles.scss";
import { addErrorMessage, addSuccessMessage, addWarningMessage } from "reducers/messageSlice";
import Loading from "components/Loading/loading";

const TableUser = ({ t }) => {
    const { language } = useSelector((state) => state.user) || {};
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [listUsers, setListUsers] = useState([]);
    const [reload, setReload] = useState(false);

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
                console.log('Faild get API get all user', error);
            }
        }

        printUser();
    }, [reload]);

    const handleDeleteUser = async (item) => {
        setLoading(true);
        try {
            let res = await deleteUserService(item.id);
            if (res && res.errCode === 0) {
                dispatch(addSuccessMessage({ title: 'Xóa thành công', content: 'Đã xóa thành công người dùng!!!' }));
                setReload(!reload);
            } else if (res && res.errCode === 2) {
                dispatch(addWarningMessage({ title: 'Xóa không thành công', content: 'Vui lòng kiểm tra lại!!!' }));
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
            dispatch(addErrorMessage({ title: "Đã có lỗi xảy ra", content: "Vui lòng thử lại sau!!!" }))
            console.log('Faild api delete user', error);
        }


    }

    // console.log('Check list user', listUsers)

    return (
        <table id="tableManager">
            <Loading loading={loading} />
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
                                        ><i className="fas fa-pencil-alt"></i></button> */}
                                    <button className="btn-delete"
                                        onClick={() => handleDeleteUser(item)}
                                    ><i className="fas fa-trash"></i></button>
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