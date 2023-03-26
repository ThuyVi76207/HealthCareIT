import { withNamespaces } from "react-i18next";
import ListPatient from "../features/PatientManager/ListPatient";
import ManagerLayout from "../layouts/ManagerLayout";

const PatientManager = ({ t }) => {
    return (
        <ManagerLayout>
            <div className="w-[95%] mx-auto py-3">
                <h2 className="text-center text-[25px] font-bold py-12">{t('patientManager.title')}</h2>
                <ListPatient />
            </div>


        </ManagerLayout>
    )
}

export default withNamespaces()(PatientManager);