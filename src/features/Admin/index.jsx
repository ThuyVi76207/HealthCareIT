import NotFound from "components/NotFound";
import HomeManager from "./pages/HomeManager";

const { Routes, Route } = require("react-router-dom");

function HealthManager() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<HomeManager />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </>
    )
}

export default HealthManager;