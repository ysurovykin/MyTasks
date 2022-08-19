
import { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { useAppDispatch } from './redux/hooks/redux';
import { refresh } from './redux/reducers/UserActionCreator';


function App() {

  const dispatch = useAppDispatch();

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
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
