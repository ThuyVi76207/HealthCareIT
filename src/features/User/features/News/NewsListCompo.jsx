import { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { getAllNews } from "services/userService";
import NewsCard from "./NewsCard";
import "./NewsContainerStyles.scss";

const NewsListCompo = ({ t }) => {

    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
        const printNewsList = async () => {
            try {
                let res = await getAllNews()
                if (res && res.errCode === 0) {
                    setNewsList(res.data);
                }
            } catch (err) {
                console.log("Failed to print news list", err);
            }
        }

        printNewsList();
    }, [])

    console.log("Check news list", newsList);

    return (
        <div className="news-list">
            <div className="news-list_head flex items-center">
                <div className="w-[70%] mx-auto flex items-center">
                    <i className="text-[30px] text-[#fff] mt-1 mr-1"><ion-icon name="arrow-forward-outline"></ion-icon></i>
                    <h2 className="uppercase text-[22px] text-[#fff] font-bold">{t('newcontainer.titles')}</h2>
                </div>


            </div>
            <div className="w-[75%] mx-auto my-[40px]">
                <div className="grid grid-cols-2 gap-[4%]">
                    {
                        newsList && newsList.length > 0 &&
                        newsList.map((item, index) => {
                            return (
                                <div key={index}>
                                    <NewsCard news={item} />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default withNamespaces()(NewsListCompo)