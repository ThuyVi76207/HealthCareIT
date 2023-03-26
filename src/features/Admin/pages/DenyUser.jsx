
const DenyUser = () => {
    return (
        <div className="text-center text-red-500 text-[20px] font-bold w-full h-full">
            <div className="w-[50%] mx-auto h-[600px] flex justify-center items-center">
                <h2>Bạn không có quyền truy cập trang này!!! Mời quay lại <a href="/"><u>trang chủ</u></a></h2>
            </div>
        </div>
    )
}

export default DenyUser;