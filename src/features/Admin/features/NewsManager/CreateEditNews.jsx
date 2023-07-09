import CommonInput from 'features/Admin/components/Input/CommonInput';
import { useMemo, useRef, useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  addErrorMessage,
  addSuccessMessage,
  addWarningMessage,
} from 'reducers/messageSlice';
import { createNews, editNewsService } from 'services/adminService';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import ManagerLayout from 'features/Admin/layouts/ManagerLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { getUrlDynamic } from 'features/Admin/components/Auth';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const CreateEditNews = ({ t }) => {
  const rolID = sessionStorage.getItem('role');
  const profileuser = JSON.parse(localStorage.getItem(`${rolID}`));
  const { id } = useParams();
  const isAddMode = !id;
  // console.log("Check mode", isAddMode);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const editnews = useSelector((state) => state.editcommon) || {};
  // console.log("Check your edit news", editnews);
  const formref = useRef(null);

  const [nameNews, setNameNews] = useState('');
  const [imgNews, setImgNews] = useState();
  const [descriptionMarkdown, setDescriptionMarkdown] = useState('');
  const [descriptionHTML, setDescriptionHTML] = useState('');
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    nameNews: '',
    descriptionMarkdown: '',
  });

  const isValidated = () => {
    let validated = true;
    let _error = {};

    if (nameNews === '') {
      validated = false;
      _error.nameNews = 'Vui lòng nhập tên bài đăng';
    }
    if (descriptionMarkdown === '') {
      validated = false;
      _error.descriptionMarkdown = 'Vui lòng nhập mô tả bài đăng';
    }

    setError(_error);
    return validated;
  };

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
      setImgNews(base64);
    }
  };

  const handleResetForm = () => {
    setNameNews('');
    setDescriptionMarkdown('');
    setImgNews();
  };

  const srollToInput = () => {
    formref.current.scrollIntoView();
  };

  const handleCreateNewsOnClick = () => {
    if (loading) return;
    createdNews();
  };

  const createdNews = async () => {
    if (!isValidated()) return srollToInput();

    const data = {
      name: nameNews,
      image: imgNews,
      descriptionHTML: descriptionHTML,
      descriptionMarkdown: descriptionMarkdown,
      doctorId: profileuser.id,
    };

    setLoading(true);

    try {
      let res = await createNews(data);
      // console.log('Check created news', res);
      if (res && res.errCode === 0) {
        dispatch(
          addSuccessMessage({
            title: 'Tạo thành công',
            content: 'Thêm bài đăng thành công!!!',
          })
        );
        srollToInput();
      } else if (res && res.errCode === 1) {
        dispatch(
          addWarningMessage({
            title: 'Tạo không thành công',
            content: 'Vui lòng thêm ảnh bài đăng!!!',
          })
        );
        srollToInput();
      }

      setLoading(false);
      handleResetForm();
    } catch (error) {
      dispatch(
        addErrorMessage({
          title: 'Đã có lỗi xảy ra',
          content: 'Vui lòng thử lại sau!!!',
        })
      );
      setLoading(false);
      // console.log('Faild to create a news: ', error);
    }
  };

  function handleEditorChange({ html, text }) {
    setDescriptionHTML(html);
    setDescriptionMarkdown(text);
  }

  useMemo(() => {
    if (isAddMode) return;

    setNameNews(editnews.name);
    setDescriptionMarkdown(editnews.descriptionMarkdown);
    setImgNews(editnews.image);
  }, [isAddMode, editnews.name, editnews.descriptionMarkdown, editnews.image]);

  const handleEditNews = () => {
    if (loading) return;
    editNews();
  };

  const editNews = async () => {
    if (!isValidated()) return srollToInput();

    let data = {
      id: id,
      name: nameNews,
      image: imgNews,
      descriptionHTML: descriptionHTML,
      descriptionMarkdown: descriptionMarkdown,
    };

    setLoading(true);
    try {
      let res = await editNewsService(data);
      // console.log('Check results edit', res);
      if (res && res.errCode === 0) {
        dispatch(
          addSuccessMessage({
            title: 'Lưu thành công',
            content: 'Sửa thành công thông tin bài đăng',
          })
        );
        srollToInput();
      } else if (res && res.errCode === 2) {
        dispatch(
          addWarningMessage({
            title: 'Bài đăng không tồn tại',
            content: 'Vui lòng kiểm tra lại!!!',
          })
        );
        srollToInput();
      }
      setLoading(false);
      let userUrl = getUrlDynamic(profileuser.roleId);
      navigate(`/manager/system/${userUrl}/newsmanager`);
    } catch (err) {
      dispatch(
        addErrorMessage({
          title: 'Đã có lỗi xảy ra',
          content: 'Vui lòng thử lại sau!!!',
        })
      );
      setLoading(false);
      // console.log('Faild to edit user', err);
    }
  };

  return (
    <ManagerLayout>
      <h2 className="text-center text-[25px] font-bold py-8">{`${
        isAddMode ? t('createnews.titles') : t('editnews.titles')
      }`}</h2>
      <form ref={formref}>
        <div className="px-12">
          <div className="w-[30%] my-4">
            <CommonInput
              field={t('createnews.namenews')}
              name="news"
              value={nameNews}
              onChange={(e) => setNameNews(e.target.value)}
              placeholder={t('createnews.phdernews')}
              maxLength={100}
              error={error.nameNews}
              required
            />
          </div>
          <h2 className="text-[20px] font-bold mb-2">
            {t('createnews.imgnews')}
          </h2>
          <div className="mt-2 mb-4">
            <button
              type="button"
              name="upload"
              className="bg-[#003985] text-white font-bold py-2 px-2 mr-5 mb-2 relative hover:opacity-80 hover:cursor-pointer rounded-[4px] text-[15px]"
            >
              <i className="mr-2 text-[15px]">
                <ion-icon name="cloud-upload-outline"></ion-icon>
              </i>
              {t('createnews.upload')}
              <input
                className="opacity-0 absolute w-full h-full top-0 left-0"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
              />
            </button>
            {imgNews && (
              <img src={imgNews} className="w-[120px] h-[120px] mb-4" alt="" />
            )}
          </div>
          <div className="mb-4">
            {error.descriptionMarkdown && (
              <p className="text-red-600">{error.descriptionMarkdown}</p>
            )}
            <MdEditor
              style={{ height: '500px', width: '100%' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
              value={descriptionMarkdown}
            />
          </div>
        </div>
      </form>
      {isAddMode ? (
        <button
          onClick={handleCreateNewsOnClick}
          className="bg-[#003985] ml-12 text-white text-[18px] font-medium px-4 py-2 mb-5 mt-2  rounded-[5px]"
        >
          {t('createnews.save')}
        </button>
      ) : (
        <button
          onClick={handleEditNews}
          className="bg-[#003985] ml-12 text-white text-[18px] font-medium px-4 py-2 mb-5 mt-2  rounded-[5px]"
        >
          {t('createnews.save')}
        </button>
      )}
    </ManagerLayout>
  );
};

export default withNamespaces()(CreateEditNews);
