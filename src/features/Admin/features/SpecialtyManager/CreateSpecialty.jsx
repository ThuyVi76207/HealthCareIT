import CommonInput from "features/Admin/components/Input/CommonInput";
import { useState } from "react";
import { withNamespaces } from "react-i18next";
import MarkdownIt from "markdown-it";
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useRef } from "react";
import Loading from "components/Loading/loading";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const CreateSpecialty = ({ t }) => {

    const formRef = useRef(null);

    const [nameSpecialty, setNameSpecialty] = useState("");
    const [descriptionMarkdown, setdescriptionMarkdown] = useState("");
    const [descriptionHTML, setdescriptionHTML] = useState("");
    const [showImg, setShowImg] = useState();
    const [loading, setloading] = useState(false);

    const [error, setError] = useState({
        nameSpecialty: '',
        descriptionMarkdown: '',
    });

    const isValidated = () => {
        let validated = true;
        let _error = {};

        if (nameSpecialty === "") {
            validated = false;
            _error.nameSpecialty = "Vui long nhap ten chuyen khoa"
        }
        if (descriptionMarkdown === "") {
            validated = false;
            _error.descriptionMarkdown = "Vui long nhap mo ta chuyen khoa"
        }

        setError(_error);
        return validated
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleImageUpload = async (e) => {
        if (e.target.files.length > 0) {
            const image = e.target.files[0];
            const base64 = await convertBase64(image);
            setShowImg(base64);
        }
    };

    function handleEditorChange({ html, text }) {
        setdescriptionHTML(html);
        setdescriptionMarkdown(text);
    }

    const srollToInput = () => {
        formRef.current.scrollIntoView();

    }
    const handleCreateSpecialtyOnClick = () => {
        if (loading) return;
        CreateNewSpecialty();
    };

    const CreateNewSpecialty = async () => {
        if (!isValidated) return srollToInput();

        const data = {
            image: showImg,
            name: nameSpecialty,
            descriptionHTML: descriptionHTML,
            descriptionMarkdown: descriptionMarkdown,
        }

        console.log('Check data', data);
        setloading(true);

        try {
            let res = await CreateNewSpecialty(data)
            console.log('Check success', res);
            // if (res && res.errCode === 0) {

            // }
        } catch (error) {
            setloading(false);
            console.log('Faild to create a new specialty error: ', error);
        }
    }

    return (
        <div>
            <Loading loading={loading} />
            <h2 className="text-center text-[25px] font-bold py-12">{t('createspecialty.titles')}</h2>
            <form ref={formRef}>
                <div className="px-12">
                    <div className="w-[30%] my-4">
                        <CommonInput
                            field={t('createspecialty.namespecialty')}
                            name="specialty"
                            value={nameSpecialty}
                            onChange={(e) => setNameSpecialty(e.target.value)}
                            placeholder={t('createspecialty.phderspecialty')}
                            maxLength={100}
                            error={error.nameSpecialty}
                            required
                        />
                    </div>
                    <h2 className="text-[20px] font-bold mb-2">{t('createspecialty.imgspecialty')}</h2>
                    <div className='mt-2 mb-4'>
                        {/* <label className="font-bold text-[20px]">{t('createuser.upload')}</label> */}
                        <button type="button" name="upload" className="bg-[#003985] text-white font-bold py-2 px-2 mr-5 mb-2 relative hover:opacity-80 hover:cursor-pointer rounded-[4px] text-[15px]">
                            <i className="mr-2 text-[15px]"><ion-icon name="cloud-upload-outline"></ion-icon></i>
                            {t('createspecialty.upload')}
                            <input
                                className="opacity-0 absolute w-full h-full top-0 left-0"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e)}
                            />

                        </button>
                        {showImg && <img src={showImg} className="w-[120px] h-[120px] mb-4" alt="" />}
                    </div>
                    <div className="mb-4">
                        {error.descriptionMarkdown && <p className="text-red-600">{error.descriptionMarkdown}</p>}
                        <MdEditor
                            style={{ height: '500px', width: '100%' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={handleEditorChange}
                            value={descriptionMarkdown}
                        />
                    </div>

                    <button onClick={handleCreateSpecialtyOnClick} className="bg-[#003985] text-white text-[18px] font-medium px-4 py-2 mb-5 mt-2  rounded-[5px]">{t('createspecialty.save')}</button>

                </div>

            </form>
        </div>
    )
}

export default withNamespaces()(CreateSpecialty);