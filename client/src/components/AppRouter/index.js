
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { HelloPage } from "../../pages/HelloPage";
import { LoginPage } from "../../pages/LoginPage";
import { MainPage } from "../../pages/MainPage";
import { PlaylistPage } from "../../pages/PlaylistPage";
import { RegistrationPage } from "../../pages/RegistrationPage";
import { useAppSelector } from "../../redux/hooks/redux";
import { UserLoading } from "../loaders/user-loader";

function AppRouter() {

    const { userData } = useAppSelector(state => state.userSlice)
    {
        if (userData?.id) {
            return <Routes>
                < Route key={'main'} path={'/'} element={< MainPage />} exact />
                <Route key={'playlist'} path={'/:id'} element={<PlaylistPage />} exact />
            </Routes>
        }
        else if (!userData?.id) {
            return <Routes>
                <Route key={'hello'} path={'/'} element={<HelloPage />} exact />
                <Route key={'login'} path={'/login'} element={<LoginPage />} exact />
                <Route key={'registration'} path={'/registration'} element={<RegistrationPage />} exact />
            </Routes>
        }
        else {
            return <UserLoading />
        }
    }
}
export default AppRouter;