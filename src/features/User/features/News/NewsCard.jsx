import "./NewsCardStyles.scss"

const NewsCard = ({ news }) => {

    console.log(news)
    return (
        <div className="news">
            <img style={{ width: "140px", height: "140px", cursor: "pointer" }} src={news.image} alt={news.name} />
            <div>
                <div className="news__overfow">
                    <h3 className="news__title hover:text-[#16917c] cursor-pointer">{news.name}</h3>
                    <div dangerouslySetInnerHTML={{ __html: news.descriptionHTML }} className='text-[15px]'></div>
                </div>
                .........
                <div className="news__actions">

                    <button className="font-semibold hover:text-red-500">Chi tiet</button>

                </div>
            </div>

        </div>
    )
}

export default NewsCard