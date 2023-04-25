import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    var chatbox = document.getElementById("fb-customer-chat");
    chatbox.setAttribute("page_id", "102440526142629");
    chatbox.setAttribute("attribution", "biz_inbox");

    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: "v16.0",
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);
  return (
    <>
      <div id="fb-root"></div>

      <div id="fb-customer-chat" class="fb-customerchat"></div>
    </>
  );
};

export default Chatbot;
