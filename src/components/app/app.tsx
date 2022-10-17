import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainScreen from '../../pages/main/main';
import MainChildScreen from '../../pages/main/page-content';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateFuckingRoute from '../private-fucking-route/private-fucking-route';
import MyListScreen from '../../pages/my-list/my-list';
import SignInScreen from '../../pages/sign-in/sign-in';


type AppScreenProps = {
  pisya: number;
}

function App({pisya}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainScreen pisya={pisya}>
              <MainChildScreen/>
            </MainScreen>
          }
        />
        <Route
          path="/login"
          element={<SignInScreen />}
        />
        <Route
          path="/mylist"
          element={
            <PrivateFuckingRoute
              authorizationStatus='NO_AUTH'
            >
              <MyListScreen/>
            </PrivateFuckingRoute>
          }
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
