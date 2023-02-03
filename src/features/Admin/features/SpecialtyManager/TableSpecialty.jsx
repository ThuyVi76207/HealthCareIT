import { useEffect, useState } from "react";
import { getAllSpecialty } from "services/userService";
import 'features/Admin/components/StylesCommon/TableManagerStyles.scss';
import { withNamespaces } from "react-i18next";
import { convertDateToDateTime } from "function/formater";

const TableSpecialty = ({ t }) => {

    const [listspecialty, setListSpecialty] = useState([]);

    useEffect(() => {
        const printSpecialtyAll = async () => {
            try {
                let res = await getAllSpecialty();
                if (res && res.errCode === 0) {
                    // console.log('Check api specialty: ', res.data);
                    setListSpecialty(res.data);
                }

            } catch (error) {
                console.log('Faild to print API all specialty error: ', error);
            }
        }

        printSpecialtyAll();
    }, [])

    return (
        <table id="tableManager">
            <tbody>
                <tr className="uppercase">
                    <th>STT</th>
                    <th>{t('tablespecialty.name')}</th>
                    <th>{t('tablespecialty.daycreate')}</th>
                    <th>{t('tablespecialty.dayupdate')}</th>
                    <th>{t('tablespecialty.choose')}</th>
                </tr>

                {
                    listspecialty && listspecialty.length > 0 &&
                    listspecialty.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{convertDateToDateTime(item.createdAt)}</td>
                                <td>{convertDateToDateTime(item.updatedAt)}</td>
                                <td></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default withNamespaces()(TableSpecialty);