import { withNamespaces } from "react-i18next";
import ListBook from "../features/BookManager/ListBook";

const { default: ManagerLayout } = require("../layouts/ManagerLayout")

const Bookmanager = ({ t }) => {
    return (
        <ManagerLayout>
            <div className="w-[95%] mx-auto py-3">
                <h2 className="text-center text-[25px] font-bold py-12">{t('bookmanager.title')}</h2>
                <ListBook />
            </div>



        </ManagerLayout>
    )
}

export default withNamespaces()(Bookmanager);