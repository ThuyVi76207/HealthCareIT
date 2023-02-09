import { PRICES_OPTIONS } from "constants";
import CommonInput from "features/Admin/components/Input/CommonInput";
import ManagerLayout from "features/Admin/layouts/ManagerLayout";
import { getFormattedPriceUSD, getFormattedPriceVND } from "function/formater";
import { useEffect, useMemo, useRef, useState } from "react";
import { withNamespaces } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors, saveDetailDoctorService } from "services/adminService";
import { getAllSpecialty, getDetailInforDoctor, getSettingService } from "services/userService";
import MarkdownIt from "markdown-it";
import MdEditor from 'react-markdown-editor-lite';
import { CRUD_ACTIONS } from "constants";
import { addErrorMessage, addSuccessMessage, addWarningMessage } from "reducers/messageSlice";
import Loading from "components/Loading/loading";
import { useParams } from "react-router-dom";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const AddEditInforDoctor = ({ t }) => {
    const { id } = useParams();
    const isAddMode = !id;
    console.log("Check mode", isAddMode);

    const formref = useRef(null);
    const dispatch = useDispatch();


    const { language } = useSelector((state) => state.user) || {};
    const [loading, setLoading] = useState(false);

    const [listDoctor, setListDoctor] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(0);
    const [description, setDescription] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("PRI1");
    const [selectedSpecialty, setSelectedSpecialty] = useState(0);
    const [listSpecialty, setListSpecialty] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("PRO2");
    const [listProvinces, setListProvinces] = useState([]);
    const [addressClinic, setAddressClinic] = useState("");
    const [nameClinic, setNameClinic] = useState("");
    const [note, setNote] = useState("");
    const [descriptionMarkdown, setDescriptionMarkdown] = useState("");
    const [descriptionHTML, setDescriptionHTML] = useState("");

    const [error, setError] = useState({
        selectedDoctor: '',
        selectedSpecialty: '',
        description: '',
        nameClinic: '',
        addressClinic: '',
        descriptionMarkdown: '',
    });

    const isValidated = () => {
        let validated = true;
        let _error = {};

        if (selectedDoctor === 0) {
            validated = false;
            _error.selectedDoctor = "Vui lòng chọn bác sĩ"
        }
        if (selectedSpecialty === 0) {
            validated = false;
            _error.selectedSpecialty = "Vui lòng chọn chuyên khoa"
        }
        if (description === '') {
            validated = false;
            _error.description = "Vui lòng nhập thông tin giới thiệu"
        }
        if (nameClinic === '') {
            validated = false;
            _error.nameClinic = "Vui lòng nhập tên bệnh viện làm việc"
        }
        if (addressClinic === '') {
            validated = false;
            _error.addressClinic = "Vui lòng nhập địa chỉ bệnh viện làm việc"
        }
        if (descriptionMarkdown === "") {
            validated = false;
            _error.descriptionMarkdown = "Vui lòng nhập mô tả bác sĩ";
        }


        setError(_error);
        return validated;
    }

    useEffect(() => {
        const getListDoctor = async () => {
            try {
                let res = await getAllDoctors();
                if (res && res.errCode === 0) {
                    // console.log("Check list doctor", res.data);
                    setListDoctor(res.data);
                }
            } catch (error) {
                console.log('Faild to get list of Doctor', error)
            }
        }
        getListDoctor();
    }, []);

    useEffect(() => {
        const getListSpecialty = async () => {
            try {
                let res = await getAllSpecialty();
                if (res && res.errCode === 0) {
                    // console.log("Check list specialty", res.data);
                    setListSpecialty(res.data);
                }
            } catch (error) {
                console.log('Faild to get list of specialty', error)
            }
        }
        getListSpecialty();
    }, []);

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
    }, []);

    function handleEditorChange({ html, text }) {
        setDescriptionMarkdown(text);
        setDescriptionHTML(html);

    }

    const srollToInput = () => {
        formref.current.scrollIntoView();
    }

    const handleResetForm = () => {
        setSelectedDoctor(0);
        setDescription('');
        setSelectedSpecialty(0);
        setNameClinic('');
        setAddressClinic('');
        setNote('');
        setDescriptionMarkdown('');
        setSelectedPrice('PRI1');
        setSelectedProvince('PRO2');
    }

    const handleAddInforDoctorOnClick = () => {
        if (loading) return;
        saveInforDoctor();
    }

    const saveInforDoctor = async () => {
        if (!isValidated()) return srollToInput();

        let data = {
            contentHTML: descriptionHTML,
            contentMarkdown: descriptionMarkdown,
            description: description,
            doctorId: selectedDoctor,
            action: isAddMode ? CRUD_ACTIONS.CREATE : CRUD_ACTIONS.EDIT,

            selectedPayment: 'PAY2',//default payment is Paypal
            selectedPrice: selectedPrice,
            selectedProvince: selectedProvince,
            selectedSpecialty: selectedSpecialty,
            nameClinic: nameClinic,
            addressClinic: addressClinic,
            note: note,
            specialtyId: selectedSpecialty,
        }

        console.log("check data", data);

        try {
            let res = await saveDetailDoctorService(data)
            console.log("Check save doctor", res);
            if (res && res.errCode === 0) {
                dispatch(addSuccessMessage({ title: "Thêm thành công", content: "Thêm thành công thông tin bác sĩ" }));
                srollToInput();
            } else if (res && res.errCode === 1) {
                dispatch(addWarningMessage({ title: "Thêm thất bại", content: "Vui lòng kiểm tra lại thông tin!!!" }));
                srollToInput();
            }
            setLoading(false);
            // handleResetForm();
        } catch (error) {
            dispatch(addErrorMessage({ title: "Đã có lỗi xảy ra", content: "Vui lòng thử lại sau!!!" }))
            setLoading(false);
            console.log('Faild to add informations doctor', error)
        }
    }
    console.log("Check selected doctor", selectedDoctor)

    useMemo(() => {
        if (isAddMode) return;

        const getInforDoctor = async () => {
            try {
                let res = await getDetailInforDoctor(id);
                console.log("Check result inforDoctor: ", res);
                let infor = res.data
                if (res && res.error === 0) {
                    setSelectedDoctor(infor.id);
                    setDescription(infor.Markdown.description);
                    setSelectedSpecialty(infor.Doctor_Infor.specialtyId);
                    setNameClinic(infor.Doctor_Infor.nameClinic);
                    setAddressClinic(infor.Doctor_Infor.addressClinic);
                    setNote(infor.Doctor_Infor.note);
                    setDescriptionMarkdown(infor.Markdown.contentMarkdown);
                    setSelectedPrice(infor.Doctor_Infor.priceId);
                    setSelectedProvince(infor.Doctor_Infor.provinceId);
                    handleEditorChange();
                }

            } catch (err) {
                console.log("Faild to get inforDoctor", err);
            }
        }
        getInforDoctor();

    }, [isAddMode, id])
    return (
        <ManagerLayout>
            <Loading loading={loading} />
            <h2 className="text-center text-[25px] font-bold py-12">{t('addinfordoctor.titles')}</h2>
            <form ref={formref}>
                <div className="px-12 flex gap-[10%]">
                    <div className="mb-4 w-[25%]">
                        <label className="font-bold text-[20px]">{t('addinfordoctor.namedoctor')}</label>
                        <span className="text-red-600">*</span>
                        <select
                            onChange={(e) => setSelectedDoctor(e.target.value)}
                            value={selectedDoctor}
                            className="w-full rounded-[4px] px-2 border-b-2 border-[#003985] placeholder-shown:border-gray-500 focus:outline-none h-[40px]"
                        >
                            <option value={0}>{`--- ${t('addinfordoctor.selecdoctor')} ---`}</option>
                            {listDoctor
                                .map((option) => {
                                    let nameDoctorVi, nameDoctorEn;
                                    nameDoctorVi = `${option.lastName} ${option.firstName}`;
                                    nameDoctorEn = `${option.firstName} ${option.lastName}`;
                                    return (
                                        <option
                                            value={option.id}
                                            key={option.id}
                                        // selected={option.value === selectedRole}
                                        >
                                            {language === 'vi' ? nameDoctorVi : nameDoctorEn}
                                        </option>
                                    )
                                })}
                        </select>
                        {error.selectedDoctor && <span className="text-red-600">{error.selectedDoctor}</span>}
                    </div>

                    <div className='w-[65%] mb-6'>
                        <label className="font-bold text-[20px] inline-block">{t('addinfordoctor.inforIntroduce')}</label>
                        <span className="text-red-600">*</span>
                        {error.description && <span className="text-red-600">{error.description}</span>}
                        <textarea className=' form-control block mt-2 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                                                 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            rows="4"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            placeholder={t('addinfordoctor.phderinforIntro')}
                        >
                        </textarea>
                    </div>

                </div>
                <div className="px-12 flex gap-[15%]">
                    <div className="mb-4 w-[25%]">
                        <label className="font-bold text-[20px]">{t('addinfordoctor.namespecialty')}</label>
                        <span className="text-red-600">*</span>
                        <select
                            onChange={(e) => setSelectedSpecialty(e.target.value)}
                            value={selectedSpecialty}
                            className="w-full rounded-[4px] px-2 border-b-2 border-[#003985] placeholder-shown:border-gray-500 focus:outline-none h-[40px]"
                        >
                            <option value={0}>{`--- ${t('addinfordoctor.selecspecialty')} ---`}</option>
                            {listSpecialty
                                .map((option) => (
                                    <option
                                        value={option.id}
                                        key={option.id}
                                    // selected={option.value === selectedRole}
                                    >
                                        {option.name}
                                    </option>
                                ))}
                        </select>
                        {error.selectedSpecialty && <span className="text-red-600">{error.selectedSpecialty}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="font-bold text-[20px]">{t('addinfordoctor.price')}</label>
                        <span className="text-red-600">*</span>
                        <select
                            onChange={(e) => {
                                setSelectedPrice(e.target.value);
                            }}
                            value={selectedPrice}
                            className="w-full rounded-[4px] px-2 border-b-2 border-[#003985] placeholder-shown:border-gray-500 focus:outline-none h-[40px]"
                        >
                            {PRICES_OPTIONS
                                .map((option) => (
                                    <option
                                        value={option.value}
                                        key={option.value}
                                    // selected={option.value === selectedRole}
                                    >
                                        {language === 'vi' ? getFormattedPriceVND(option.label.vi) : getFormattedPriceUSD(option.label.en)}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="font-bold text-[20px]">{t('addinfordoctor.city')}</label>
                        <span className="text-red-600">*</span>
                        <select
                            onChange={(e) => {
                                setSelectedProvince(e.target.value);
                            }}
                            value={selectedProvince}
                            className="w-full rounded-[4px] px-2 border-b-2 border-[#003985] placeholder-shown:border-gray-500 focus:outline-none h-[40px]"
                        >
                            {listProvinces
                                .map((option) => (
                                    <option
                                        value={option.keyMap}
                                        key={option.keyMap}
                                    // selected={option.value === selectedRole}
                                    >
                                        {language === 'vi' ? option.value_Vi : option.value_En}
                                    </option>
                                ))}
                        </select>
                    </div>

                </div>
                <div className="px-12 grid grid-cols-2 gap-[10%] mt-4">
                    <CommonInput
                        field={t('addinfordoctor.nameclinic')}
                        name="nameClinic"
                        value={nameClinic}
                        onChange={(e) => setNameClinic(e.target.value)}
                        placeholder={t('addinfordoctor.phdernameclinic')}
                        maxLength={100}
                        error={error.nameClinic}
                        required
                    />
                    <CommonInput
                        field={t('addinfordoctor.addresswork')}
                        name="addressWork"
                        value={addressClinic}
                        onChange={(e) => setAddressClinic(e.target.value)}
                        placeholder={t('addinfordoctor.phderaddresswork')}
                        maxLength={100}
                        error={error.addressClinic}
                        required
                    />
                </div>
                <div className='px-12 w-[50%] mb-6 mt-6'>
                    <label className="font-bold text-[20px] inline-block">{t('addinfordoctor.note')}</label>
                    <textarea className=' form-control block mt-2 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                                                 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                        rows="4"
                        onChange={(e) => setNote(e.target.value)}
                        value={note}
                        placeholder={t('addinfordoctor.phdernote')}
                    >
                    </textarea>
                </div>
                <div className="px-12 mb-4">
                    {error.descriptionMarkdown && <p className="text-red-600">{error.descriptionMarkdown}</p>}
                    <MdEditor
                        style={{ height: '500px', width: '100%' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={handleEditorChange}
                        value={descriptionMarkdown}
                    />
                </div>
            </form>

            <button onClick={handleAddInforDoctorOnClick} className="bg-[#003985] ml-12 text-white text-[18px] font-medium px-4 py-2 mb-5 mt-2  rounded-[5px]">{t('createnews.save')}</button>

        </ManagerLayout>
    )
}

export default withNamespaces()(AddEditInforDoctor);