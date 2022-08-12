
import { Route, Routes } from "react-router-dom";
import { HelloPage } from "../../pages/HelloPage";
import { LoginPage } from "../../pages/LoginPage";
import { MainPage } from "../../pages/MainPage";
import { PlaylistPage } from "../../pages/PlaylistPage";
import { RegistrationPage } from "../../pages/RegistrationPage";

function AppRouter() {
        return <Routes>
            <Route key={'hello'} path={'/'} element={<HelloPage />} exact />
            <Route key={'login'} path={'/login'} element={<LoginPage />} exact />
            <Route key={'registration'} path={'/registration'} element={<RegistrationPage />} exact />
            <Route key={'main'} path={'/main'} element={<MainPage />} exact />
            <Route key={'playlist'} path={'/:id'} element={<PlaylistPage />} exact />
        </Routes>
}
export default AppRouter;