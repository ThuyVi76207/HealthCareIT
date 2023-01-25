import MainLayout from 'features/User/layouts/MainLayout';
import { convertDateToDateTime } from 'function/formater';
import { useState } from 'react';
import { useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getAllNewsById } from 'services/userService';
import './NewsDetailStyles.scss';
import { Buffer } from 'buffer';

const NewsDetail = ({ t }) => {
    const { id } = useParams();
    const [dataDetailNews, setDataDetailNews] = useState({});
    // console.log('Check id param', id);

    useEffect(() => {
        const printNewsDetail = async () => {
            try {
                let resNewsDetail = await getAllNewsById(
                    {
                        id: id,
                    }
                );
                if (resNewsDetail && resNewsDetail.errCode === 0)
                    setDataDetailNews(resNewsDetail.data);

            } catch (error) {
                console.log('Failed to get API detail news', error);
            }

        }

        printNewsDetail();
    }, [id]);

    let imageBase64 = '';
    if (dataDetailNews.image) {
        imageBase64 = Buffer.from(dataDetailNews.image, 'base64').toString('binary');
    }
    let createDate = convertDateToDateTime(dataDetailNews.createdAt);
    let updateDate = convertDateToDateTime(dataDetailNews.updatedAt);


    return (
        <MainLayout>
            <div className='news-detail'>
                <div className='flex gap-[5%]'>
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

                                <div dangerouslySetInnerHTML={{ __html: dataDetailNews.descriptionHTML }}></div>
                            </div>
                        }
                    </div>
                    <div className='news-detail__right'>Tin tuc moi</div>
                </div>

            </div>
        </MainLayout>
    )
}

export default withNamespaces()(NewsDetail);