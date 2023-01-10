import React, { useEffect, useState } from "react";
import { getAllNews } from "services/userService";
import './NewsStyles.scss';

function News() {
    const [listNews, setListNews] = useState([]);

    useEffect(() => {
        const printAllNews = async () => {
            try {
                const res = await getAllNews();
                setListNews(res.data);
            } catch (err) {
                console.log('Failed to get all news', err);
            }
        }
        printAllNews();
    }, [])

    console.log('Check list News', listNews);

    return (
        <div>
            News
        </div>
    )
}

export default News;