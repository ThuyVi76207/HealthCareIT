import logo from 'assets/Logo/Hcare-white.svg';

const Menu = () => {

    return (
        <div className="bg-[#1b2342] flex flex-col items-center">
            <div className="opacity-95 bg-[#27284a] w-full">
                <img className="w-[120px] h-[120px] m-auto" src={logo} alt="logo" />
            </div>
            <div className="text-[#fff]">
                <ul>
                    <li className='flex items-center'>
                        <i className='mt-1 mr-4'><ion-icon name="grid-outline"></ion-icon></i>
                        <h2>Bảng điều khiển</h2>
                    </li>
                    <li>Quản lý người dùng</li>

                </ul>
            </div>

        </div>
    )
}

export default Menu;