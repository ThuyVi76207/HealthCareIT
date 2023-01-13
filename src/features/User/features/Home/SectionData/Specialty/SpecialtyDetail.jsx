import MainLayout from 'features/User/layouts/MainLayout';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllSpecialtyById } from 'services/userService';
import './SpecialtyDetailStyles.scss';
import { Buffer } from "buffer";
import { withNamespaces } from 'react-i18next';

function SpecialtyDetail({ t }) {

    const { id } = useParams();// get id param
    // console.log(id);
    const [obSpecialty, setObSpecialty] = useState({});
    const [overflowHide, setOverflowHide] = useState(true);

    useEffect(() => {
        const printSpecialtyID = async () => {
            try {
                const res = await getAllSpecialtyById({
                    id: id,
                    location: 'ALL'
                });

                setObSpecialty(res.data);

            } catch (err) {
                console.log('Failed to get specialty with id', err);
            }
        }
        printSpecialtyID();

    }, [id]);

    console.log('Check specialty id', obSpecialty)
    let imageBase64 = '';
    if (obSpecialty.image) {
        imageBase64 = Buffer.from(obSpecialty.image, 'base64').toString('binary');
    }

    return (
        <MainLayout>
            <div className='specialty-detail'>
                <div
                    style={{ backgroundImage: `url(${imageBase64})` }}
                    className={`specialty-detail-header ${overflowHide ? 'h-[15rem] overflow-hidden' : ''}`}
                >
                    <div className={`header ${overflowHide ? 'h-[15rem]' : ''}`}>
                        <div className='w-[65%] mx-auto'>
                            <h2 className='text-[20px] font-bold my-2'>{obSpecialty.name}</h2>
                            <div dangerouslySetInnerHTML={{ __html: obSpecialty.descriptionHTML }} className='text-[15px]'></div>
                        </div>
                    </div>
                </div>
                {
                    overflowHide ?
                        <div className='w-[65%] m-auto z-10'>
                            <button className='text-[#16917c]' onClick={() => setOverflowHide(false)}>{t('specialtydetail.more')}</button>
                        </div>
                        :
                        <div className='w-[65%] m-auto'>
                            <button className='text-[#16917c]' onClick={() => setOverflowHide(true)}>{t('specialtydetail.hide')}</button>
                        </div>
                }
                <div className='specialty-detail-container'>
                    <div>

                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default withNamespaces()(SpecialtyDetail);