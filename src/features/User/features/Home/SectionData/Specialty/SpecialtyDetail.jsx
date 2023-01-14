import MainLayout from 'features/User/layouts/MainLayout';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllSpecialtyById, getSettingService } from 'services/userService';
import './SpecialtyDetailStyles.scss';
import { Buffer } from "buffer";
import { withNamespaces } from 'react-i18next';
import { useSelector } from 'react-redux';
import ProfileDoctor from '../Doctor/ProfileDoctor';

function SpecialtyDetail({ t }) {

    const { id } = useParams();// get id param
    // console.log(id);
    const [obSpecialty, setObSpecialty] = useState({});
    const [listProvinces, setListProvinces] = useState([]);
    const [listDoctorId, setListDoctorId] = useState([]);
    const [overflowHide, setOverflowHide] = useState(true);
    const { language } = useSelector((state) => state.user) || {};

    useEffect(() => {
        const printSpecialtyID = async () => {
            try {
                const res = await getAllSpecialtyById({
                    id: id,
                    location: 'ALL'
                });

                setObSpecialty(res.data);

                setListDoctorId(res.data.doctorSpecialty);

            } catch (err) {
                console.log('Failed to get specialty with id', err);
            }
        }

        printSpecialtyID();

    }, [id]);

    useEffect(() => {
        const printProvince = async () => {
            try {
                const resProvince = await getSettingService('PROVINCE');
                // console.log('Province', resProvince.data);

                //Push ALL - Toan quoc vao vi tri dau tien cua mang
                let dataProvince = resProvince.data;
                dataProvince.unshift({
                    createAt: null,
                    keyMap: "ALL",
                    type: "PROVINCE",
                    value_En: "ALL",
                    value_Vi: "Toàn quốc"
                })

                setListProvinces(dataProvince);

            } catch (err) {
                console.log('Failed to get province', err);
            }
        }

        printProvince();
    }, [])

    // console.log('Province', listProvinces)

    console.log('Check specialty id', obSpecialty)
    let imageBase64 = '';
    if (obSpecialty.image) {
        imageBase64 = Buffer.from(obSpecialty.image, 'base64').toString('binary');
    }

    console.log('Check doctor id', listDoctorId)

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
                    <div className='w-[65%] mx-auto border border-transparent'>
                        <div className='province-spectialty'>
                            <select className='my-4 h-[40px] focus:outline-none rounded-[5px] px-2'>
                                {
                                    listProvinces &&
                                    listProvinces.length > 0 &&
                                    listProvinces.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.keyMap}
                                            >
                                                {language === 'vi' ? item.value_Vi : item.value_En}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        {
                            listDoctorId &&
                            listDoctorId.length > 0 &&
                            listDoctorId.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <ProfileDoctor id={item.doctorId} />
                                    </div>

                                )
                            })
                        }


                    </div>

                </div>
            </div>
        </MainLayout>
    )
}

export default withNamespaces()(SpecialtyDetail);