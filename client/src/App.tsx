
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { UserLoading } from './components/loaders/user-loader';
import { useAppDispatch, useAppSelector } from './redux/hooks/redux';
import { refresh } from './redux/reducers/UserActionCreator';


function App() {

  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector(state => state.userSlice)

  useEffect(() => {
    async function checkAuth() {
      await dispatch(refresh())
    }
    if (localStorage.getItem('token')) {
      checkAuth()
    }
  }, [])

  return (
    <BrowserRouter>
      {isLoading
        ? <UserLoading />
        : <AppRouter />
      }
    </BrowserRouter>
  );
}

export default App;
