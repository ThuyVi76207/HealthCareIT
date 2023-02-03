import { withNamespaces } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TableDoctor from "../features/DoctorManager/TableDoctor";
import ManagerLayout from "../layouts/ManagerLayout";

const DoctorManager = ({ t }) => {

    const navigate = useNavigate();

    const handleNavigateAddInformationDoctor = () => {
        navigate(`/manager/doctormanager/add-information-doctor`)
    }
    return (
        <ManagerLayout>
            <div className="w-[95%] mx-auto py-3">
                <h2 className="my-4 pb-2 text-[20px] border-b border-b-[#035795]">{t('tabledoctor.title')}</h2>
                <button
                    onClick={() => handleNavigateAddInformationDoctor()}
                    className="border border-[#f4f4f4] py-2 px-4 float-right mb-4 hover:bg-[#035795] hover:text-white"
                >{t('tabledoctor.addinfor')}</button>
                <TableDoctor />
            </div>
        </ManagerLayout>

    )
}

export default withNamespaces()(DoctorManager);