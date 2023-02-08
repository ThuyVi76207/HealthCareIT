import { withNamespaces } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TableUser from "../features/UserManager/TableUser";
import ManagerLayout from "../layouts/ManagerLayout";

const UserManager = ({ t }) => {



    const navigate = useNavigate();

    const handleNavigateCreateUser = () => {
        navigate(`/manager/usermanager/create`)
    }


    return (
        <ManagerLayout>
            <div className="w-[95%] mx-auto py-3">
                <h2 className="my-4 pb-2 text-[20px] border-b border-b-[#035795]">{t('tableuser.title')}</h2>
                <button
                    onClick={() => handleNavigateCreateUser()}
                    className="border border-[#f4f4f4] py-2 px-4 float-right mb-4 hover:bg-[#035795] hover:text-white"
                >{t('tableuser.create')}</button>
                <TableUser />
            </div>
        </ManagerLayout>
    )
}

export default withNamespaces()(UserManager);