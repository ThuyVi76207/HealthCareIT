
import { useEffect, useState } from "react";
import { getAllNews } from "services/userService";
import 'features/Admin/components/StylesCommon/TableManagerStyles.scss';
import { withNamespaces } from "react-i18next";
import { convertDateToDateTime } from "function/formater";
import { useDispatch } from "react-redux";

const TableNews = ({ t }) => {
    const dispatch = useDispatch();

    const [listnews, setListNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const printNewsAll = async () => {
            try {
                let res = await getAllNews();
                if (res && res.errCode === 0) {
                    // console.log('Check api news: ', res.data);
                    setListNews(res.data);
                }

            } catch (error) {
                console.log('Faild to print API all news error: ', error);
            }
        }

        printNewsAll();
    }, [])

    return (
        <table id="tableManager">
            <tbody>
                <tr className="uppercase">
                    <th>STT</th>
                    <th>{t('tablenews.name')}</th>
                    <th>{t('tablenews.daycreate')}</th>
                    <th>{t('tablenews.dayupdate')}</th>
                    <th>{t('tablenews.choose')}</th>
                </tr>

                {
                    listnews && listnews.length > 0 &&
                    listnews.map((item, index) => {
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

export default withNamespaces()(TableNews);