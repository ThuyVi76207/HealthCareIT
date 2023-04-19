import { auth, provider } from "components/firebase/firebase-config";
import { signInWithPopup } from "firebase/auth";
import logoGoogle from "../../../../assets/Logo/logogoogle.webp";
import "./AuthStyles.scss";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = (props) => {
  const { setIsAuth } = props;

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      cookies.set("get-name", result.user.displayName);
      cookies.set("get-photo-url", result.user.photoURL);
      console.log(result);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative w-full h-full Auth-page">
      <div className="Auth-page__container absolute ">
        <div className="shadow-[0_2px_10px_1px_rgba(0,0,0,0.3)] pt-3 pb-6">
          <img
            src={logoGoogle}
            alt="logo"
            className="w-[120px] h-[120px] mx-auto my-6"
          />
          <p className="text-center my-3">Sign in with google to continue</p>
          <div className="Auth-page__container__btn bg-[#27284a] w-[60%] mx-auto text-center">
            <button className="text-white py-2" onClick={signInWithGoogle}>
              Sign in with google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
