import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainScreen from '../../pages/main/main';
import MainChildScreen from '../../pages/main/page-content';


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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
