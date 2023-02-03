
import Menu from "../components/Menu/Menu";
import NavbarManager from "../components/Navbar/NavbarManager";
import 'react-markdown-editor-lite/lib/index.css';

const ManagerLayout = ({ children }) => {
    return (
        <div className="flex">
            <div className="w-[20%] bg-[#1b2342]">
                <Menu />
            </div>
            <div className="w-[80%]">
                <div className="">
                    <NavbarManager />
                </div>
                <div className="bg-[#f9f9f9]">
                    <div className="w-[95%] mx-auto py-6">
                        <div className="bg-[#fff] rounded-[5px]">
                            {children}
                        </div>
                    </div>

                </div>
            </div>


        </div>

    )
}

export default ManagerLayout;