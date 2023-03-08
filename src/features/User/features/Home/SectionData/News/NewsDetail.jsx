import MainLayout from 'features/User/layouts/MainLayout';
import { convertDateToDateTime } from 'function/formater';
import { useState } from 'react';
import { useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getAllNewsById } from 'services/userService';
import './NewsDetailStyles.scss';
import { Buffer } from 'buffer';
import Loading from 'components/Loading/loading';
// import LoadingSpinner from 'components/Loading/LoadingSpinner';

const NewsDetail = ({ t }) => {
    const { id } = useParams();
    const [dataDetailNews, setDataDetailNews] = useState({});
    // const [dataListNews, setDataListNews] = useState([]);
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();
    // console.log('Check id param', id);

    useEffect(() => {
        setLoading(true)

        const printNewsDetail = async () => {
            try {
                let resNewsDetail = await getAllNewsById(
                    {
                        id: id,
                    }
                );
                if (resNewsDetail && resNewsDetail.errCode === 0) {
                    setDataDetailNews(resNewsDetail.data);
                    setLoading(false)
                }
            } catch (error) {
                setLoading(true);
                console.log('Failed to get API detail news', error);
            }

        }

        printNewsDetail();
    }, [id]);

    // useEffect(() => {
    //     const printListNews = async () => {

    //         try {
    //             setLoading(true);
    //             const resListNews = await getAllNews('');
    //             if (resListNews && resListNews.errCode === 0) {
    //                 setDataListNews(resListNews.data);
    //             }

    //         } catch (error) {
    //             console.log("Failed to get API list News", error);

    //         }
    //     }

    //     printListNews();
    // }, []);

    // useEffect(() => {
    //     if (dataListNews.length > 0) {
    //         setLoading(false);
    //     }
    // }, [dataListNews])



    let imageBase64 = '';
    if (dataDetailNews.image) {
        imageBase64 = Buffer.from(dataDetailNews.image, 'base64').toString('binary');
    }
    let createDate = convertDateToDateTime(dataDetailNews.createdAt);
    let updateDate = convertDateToDateTime(dataDetailNews.updatedAt);

    // const handleViewDetailNews = (item) => {
    //     console.log('Check News id', item);
    //     navigate(`/healthcare/detail-news/${item.id}`)

    // }

    // console.log('check loading status', loading)

    return (
        <MainLayout>
            <Loading loading={loading} />
            <div className='bg-[#f7f7f7] py-6'>
                <div className='w-[70%] mx-auto flex gap-2 mb-3'>
                    <i className='ml-3'><ion-icon name="home-outline"></ion-icon></i>
                    /
                    <h2 className='text-[#16917c] font-medium'>{t('detailnews.news')}</h2>
                </div>
                <div className='news-detail'>
                    <div className='flex justify-center p-6'>
                        <div className='news-detail__left'>
                            {
                                dataDetailNews &&
                                <div>
                                    <h2 className='title-new'>{dataDetailNews.name}</h2>
                                    <div className='flex mt-2 text-gray-400'>{t('detailnews.createdat')}
                                        <p className='px-2'>{createDate}</p>{t('detailnews.updatedat')}<p className='px-2'>{updateDate}</p>
                                    </div>

                                    <div
                                        className='content'
                                        style={{ backgroundImage: `url(${imageBase64})` }}>

                                    </div>

                                    <div className='description-news' dangerouslySetInnerHTML={{ __html: dataDetailNews.descriptionHTML }}></div>
                                </div>
                            }
                        </div>
                        {/* <div className='news-detail__right'>
                            <h2 className='text-[20px] uppercase font-bold text-[#333] mt-[40px]'>{t('detailnews.more')}</h2>
                            <div className='my-5'>
                                {
                                    dataListNews && dataListNews.length > 0 &&
                                    dataListNews.map((item, index) => {
                                        return (
                                            loading ?
                                                <LoadingSpinner loading={loading} />
                                                : <div key={index} className='my-3' onClick={() => handleViewDetailNews(item)}>
                                                    <img src={item.image} alt={index} />
                                                    <h2 className='mt-2 font-bold'>{item.name}</h2>
                                                </div>
                                        )
                                    })
                                }
                            </div>

                        </div> */}
                    </div>

                </div>
            </div>

        </MainLayout>
    )
}

export default withNamespaces()(NewsDetail);