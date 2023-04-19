import { useRef } from "react";
import emailjs from "emailjs-com";

import "./ContactContentStyles.scss";

const ContactContent = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_crukp6f",
      "template_l84034d",
      form.current,
      "GegWcpmW-kLxG95PL"
    );

    e.target.reset();
  };
  return (
    <section id="contact" className="bg-contact">
      <div className="bg-contact-body">
        {/* <div className="contact-title">Contact Information</div> */}
        <div className="container contact_container">
          <div className="contact_options">
            <h2>
              HEALTH <br />
              CARE
            </h2>
            <div className="">
              <i className="contact_option">
                <ion-icon name="logo-facebook"></ion-icon>
              </i>
              <i className="contact_option">
                <ion-icon name="logo-twitter"></ion-icon>
              </i>
              <i className="contact_option">
                <ion-icon name="logo-instagram"></ion-icon>
              </i>
            </div>
          </div>
          <form ref={form} onSubmit={sendEmail} className="fm">
            <input
              className="input-info"
              type="text"
              name="name"
              placeholder="Your Full Name"
              required
            />
            <input
              className="input-info"
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <textarea
              className="textarea-info"
              name="message"
              rows="7"
              placeholder="Your Message"
              required
            ></textarea>
            <button
              type="submit"
              className="btn bg-orange-500 w-[40%] mx-auto py-3 rounded-[50px] hover:bg-orange-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactContent;
