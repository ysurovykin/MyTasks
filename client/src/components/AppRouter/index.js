
import { Route, Routes } from "react-router-dom";
import { HelloPage } from "../../pages/HelloPage";
import { LoginPage } from "../../pages/LoginPage";
import { RegistrationPage } from "../../pages/RegistrationPage";

function AppRouter() {
    {
        return <Routes>
            <Route key={'hello'} path={'/'} element={<HelloPage />} exact />
            <Route key={'login'} path={'/login'} element={<LoginPage />} exact />
            <Route key={'registration'} path={'/registration'} element={<RegistrationPage />} exact />
        </Routes>
    }
}
export default AppRouter;