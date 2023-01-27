
import Menu from "../components/Menu/Menu";
import NavbarManager from "../components/Navbar/NavbarManager";

const ManagerLayout = ({ children }) => {
    return (
        <div className="flex">
            <div className="w-[15%] border border-red-500">
                <Menu />
            </div>
            <div className="w-[85%] border border-green-600">
                <NavbarManager />
                <div>
                    {children}
                </div>
            </div>


        </div>

    )
}

export default ManagerLayout;