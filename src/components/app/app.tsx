import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainScreen from '../../pages/main/main';
import MainChildScreen from '../../pages/main/page-content';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';


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
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
