import { withNamespaces } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TableSpecialty from "../features/SpecialtyManager/TableSpecialty";
import ManagerLayout from "../layouts/ManagerLayout";

const SpecialtyManager = ({ t }) => {

    const navigate = useNavigate();

    const handleNavigateCreateSpecialty = () => {
        navigate(`/manager/specialtymanager/create`);
    }

    return (
        <ManagerLayout>
            <div className="w-[95%] mx-auto py-3">
                <h2 className="my-4 pb-2 text-[20px] border-b border-b-[#035795]">{t('tablespecialty.title')}</h2>
                <button
                    onClick={() => handleNavigateCreateSpecialty()}
                    className="border border-[#f4f4f4] py-2 px-4 float-right mb-4 hover:bg-[#035795] hover:text-white"
                >{t('tablespecialty.create')}</button>
                <TableSpecialty />
            </div>
        </ManagerLayout>
    )
}

export default withNamespaces()(SpecialtyManager);