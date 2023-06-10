import { withNamespaces } from "react-i18next";
import ListComment from "../features/CommentManager/ListComment";
import ManagerLayout from "../layouts/ManagerLayout";

const CommentManager = ({ t }) => {
  return (
    <ManagerLayout>
      <div className="w-[95%] mx-auto py-3">
        <h2 className="my-4 pb-2 text-[20px] border-b border-b-[#035795]">
          {t("listcomment.title")}
        </h2>

        <ListComment />
      </div>
    </ManagerLayout>
  );
};

export default withNamespaces()(CommentManager);
