import { useEffect, useState } from "react";
import { getAllNews } from "services/userService";
import "features/Admin/components/StylesCommon/TableManagerStyles.scss";
import { withNamespaces } from "react-i18next";
import { convertDateToDateTime } from "function/formater";
import { useDispatch } from "react-redux";
import {
  addErrorMessage,
  addSuccessMessage,
  addWarningMessage,
} from "reducers/messageSlice";
import { deleteNewsService, filterNewsByDoctorId } from "services/adminService";
import Loading from "components/Loading/loading";
import { useNavigate } from "react-router-dom";
import { addInfor } from "reducers/editcommonSlice";
import { getUrlDynamic } from "features/Admin/components/Auth";

const TableNews = ({ t }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rolID = sessionStorage.getItem("role");
  const userProfile = JSON.parse(localStorage.getItem(`${rolID}`));

  const [listnews, setListNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setLoading(true);
    const printNewsAll = async () => {
      console.log("Check roole id", userProfile.roleId);
      let data = {
        limit: "5",
        doctorId: userProfile.id,
      };
      try {
        if (userProfile.roleId === "R2" && userProfile.roleId === "R4") {
          let res = await filterNewsByDoctorId(data);
          if (res && res.errCode === 0) {
            setListNews(res.data);
            setLoading(false);
          }
          // console.log("Check result filter", res);
        } else {
          let res = await getAllNews("");
          if (res && res.errCode === 0) {
            // console.log('Check api news: ', res.data);
            setListNews(res.data);
            setLoading(false);
          }
        }
      } catch (error) {
        setLoading(false);
        console.log("Faild to print API all news error: ", error);
      }
    };

    printNewsAll();
  }, [reload, userProfile.roleId, userProfile.id]);

  const handleDeleteNews = async (item) => {
    setLoading(true);
    try {
      let res = await deleteNewsService(item.id);
      if (res && res.errCode === 0) {
        dispatch(
          addSuccessMessage({
            title: "Xóa thành công",
            content: "Đã xóa thành công bài đăng!!!",
          })
        );
        setReload(!reload);
      } else if (res && res.errCode === 2) {
        dispatch(
          addWarningMessage({
            title: "Xóa không thành công",
            content: "Vui lòng kiểm tra lại!!!",
          })
        );
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      dispatch(
        addErrorMessage({
          title: "Đã có lỗi xảy ra",
          content: "Vui lòng thử lại sau!!!",
        })
      );
      console.error("Faild api delete specialty", err);
    }
  };

  const handleEditNews = (user) => {
    dispatch(addInfor(user));
    let userUrl = getUrlDynamic(userProfile.roleId);
    navigate(`/manager/system/${userUrl}/newsmanager/edit/${user.id}`);
  };

  return (
    <>
      <Loading loading={loading} />
      <table id="tableManager">
        <tbody>
          <tr className="uppercase">
            <th>STT</th>
            <th>{t("tablenews.name")}</th>
            <th>{t("tablenews.daycreate")}</th>
            <th>{t("tablenews.dayupdate")}</th>
            <th>{t("tablenews.choose")}</th>
          </tr>

          {listnews &&
            listnews.length > 0 &&
            listnews.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{convertDateToDateTime(item.createdAt)}</td>
                  <td>{convertDateToDateTime(item.updatedAt)}</td>
                  <td className="text-center">
                    <button
                      className="mr-2 hover:text-orange-400"
                      onClick={() => handleEditNews(item)}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button
                      className="hover:text-red-600"
                      onClick={() => handleDeleteNews(item)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default withNamespaces()(TableNews);
