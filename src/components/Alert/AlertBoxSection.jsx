import { useSelector } from "react-redux";
import AlertBox from "./AlertBox";

export default function AlertBoxSection() {
    const messages = useSelector((state) => state.messages);
    console.log('Check messages', messages);
    return (
        <div className="max-h-[95%] right-[5%] md:w-[400px] fixed md:top-5 md:right-5 z-[1000000] overflow-x-hidden overflow-y-auto alert-wrapper-custom-scroll-bar">
            {messages.map((message) => {
                return (
                    <AlertBox
                        key={message.id}
                        title={message.title}
                        content={message.content}
                        type={message.type}
                        id={message.id}
                    />
                )

            })}
        </div>
    );
}
