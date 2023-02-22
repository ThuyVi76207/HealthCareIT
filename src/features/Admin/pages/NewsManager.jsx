import { withNamespaces } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUrlDynamic } from "../components/Auth";
import TableNews from "../features/NewsManager/TableNews";
import ManagerLayout from "../layouts/ManagerLayout";

const NewsManager = ({ t }) => {
    const navigate = useNavigate();
    const userProfile = useSelector((state) => state.profileuser)

    const handleNavigateCreateNews = () => {
        let userUrl = getUrlDynamic(userProfile.roleId);
        navigate(`/manager/system/${userUrl}/newsmanager/create`);
    }

    return (
        <ManagerLayout>
            <div className="w-[95%] mx-auto py-3">
                <h2 className="my-4 pb-2 text-[20px] border-b border-b-[#035795]">{t('tablenews.title')}</h2>
                <button
                    onClick={() => handleNavigateCreateNews()}
                    className="border border-[#f4f4f4] py-2 px-4 float-right mb-4 hover:bg-[#035795] hover:text-white"
                >{t('tablenews.create')}</button>
                <TableNews />
            </div>
        </ManagerLayout>
    )
}

export default withNamespaces()(NewsManager);