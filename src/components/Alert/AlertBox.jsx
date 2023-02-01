import { useDispatch } from "react-redux";
import { removeMessage } from "reducers/messageSlice";

export default function AlertBox({ title, content, type, id }) {
    const dispatch = useDispatch();

    const handleCloseMessage = (id) => {
        dispatch(removeMessage(id));
    };

    const getBackgroundColor = (type) => {
        switch (type) {
            case "success":
                return "bg-green-600";
            case "error":
                return "bg-red-600";
            case "warning":
                return "bg-yellow-600";
            default:
                return "bg-gray-600";
        }
    };

    const getIconClass = (type) => {
        switch (type) {
            case "success":
                return "fa-solid fa-circle-check";
            case "error":
                return "fa-solid fa-circle-xmark";
            case "warning":
                return "fa-solid fa-triangle-exclamation";
            default:
                return "fa-solid fa-circle-check";
        }
    };

    return (
        <>
            {id ? (
                <div role="alert" className="mb-5 pr-2 md:w-[400px] z-[1000]">
                    <div
                        className={`${getBackgroundColor(type)} text-white font-bold rounded-t p-4 w-full items-center`}
                    >
                        <div className="flex items-center pb-2">
                            <div className="text-xl">{title}</div>
                            <div className="ml-2">
                                <i className={`${getIconClass(type)}`} />
                            </div>
                            <button
                                name="close"
                                type="button"
                                onClick={() => handleCloseMessage(id)}
                                className="ml-auto font-bold"
                            >
                                X
                            </button>
                        </div>
                        <div
                            className={`${getBackgroundColor(type)} rounded-b text-md`}
                        >
                            {content}
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
}
