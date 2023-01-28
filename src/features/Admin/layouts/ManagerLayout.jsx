
import Menu from "../components/Menu/Menu";
import NavbarManager from "../components/Navbar/NavbarManager";

const ManagerLayout = ({ children }) => {
    return (
        <div className="flex">
            <div className="w-[20%] border border-red-500">
                <Menu />
            </div>
            <div className="w-[80%] border border-green-600">
                <div className="border border-orange-600">
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