import { withNamespaces } from "react-i18next";
import ListPatient from "../features/PatientManager/ListPatient";
import ManagerLayout from "../layouts/ManagerLayout";

const PatientManager = ({ t }) => {
    return (
        <ManagerLayout>
            <h2>{t('patientManager.title')}</h2>

            <ListPatient />

        </ManagerLayout>
    )
}

export default withNamespaces()(PatientManager);