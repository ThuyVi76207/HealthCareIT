import { useNavigate } from "react-router-dom";
import "./NewsCardStyles.scss";

const NewsCard = ({ news }) => {
  const navigate = useNavigate();

  const handleDetailNewsOnclick = () => {
    navigate(`/healthcare/detail-news/${news.id}`);
  };
  return (
    <div className="news">
      <img
        onClick={() => handleDetailNewsOnclick()}
        src={news.image}
        alt={news.name}
      />
      <div>
        <div className="news__overfow">
          <h3
            className="news__title hover:text-[#16917c] cursor-pointer"
            onClick={() => handleDetailNewsOnclick()}
          >
            {news.name}
          </h3>
          <div
            dangerouslySetInnerHTML={{ __html: news.descriptionHTML }}
            className="text-[15px]"
          ></div>
        </div>
        .........
        <div className="news__actions">
          <button
            onClick={() => handleDetailNewsOnclick()}
            className="font-semibold hover:text-red-500"
          >
            Chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
