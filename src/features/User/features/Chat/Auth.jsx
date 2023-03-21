import { auth, provider } from "components/firebase/firebase-config";
import { signInWithPopup } from "firebase/auth";
import logoGoogle from "../../../../assets/Logo/logogoogle.webp";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = (props) => {
  const { setIsAuth } = props;

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      console.log(result);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative w-full h-full ">
      <div className="absolute w-[300px] h-[300px]  mt-[15%] left-[40%]">
        <div className="shadow-[0_2px_10px_1px_rgba(0,0,0,0.3)] pt-3 pb-6">
          <img
            src={logoGoogle}
            alt="logo"
            className="w-[120px] h-[120px] mx-auto my-6"
          />
          <p className="text-center my-3">Sign in with google to continue</p>
          <div className="bg-[#27284a] w-[60%] mx-auto text-center">
            <button className="text-white py-2" onClick={signInWithGoogle}>
              Sign in with google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
