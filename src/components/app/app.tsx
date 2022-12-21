import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainScreen from '../../pages/main/main';
import MainChildScreen from '../../pages/main/page-content';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateFuckingRoute from '../private-fucking-route/private-fucking-route';
import MyListScreen from '../../pages/my-list/my-list';
import SignInScreen from '../../pages/sign-in/sign-in';
import AddReviewScreen from '../../pages/add-review/add-review';
import PlayerScreen from '../../pages/player/player';
import MoviePageScreen from '../../pages/movie-page/movie-page';
import {Film} from '../../types/film';


type AppScreenProps = {
  films: Film[];
}

function App({films}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainScreen
              films={films}
              render={() => <MainChildScreen/>}
            />
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
              <MyListScreen films={films}/>
            </PrivateFuckingRoute>
          }
        />
        <Route
          path="/films/:movieId/review"
          element={
            <AddReviewScreen
              getGoAway={(jopa: number) => jopa * 2}
            />
          }
        />
        <Route
          path="/player/:movieId"
          element={
            <PlayerScreen film={films[6]}/>
          }
        />
        <Route
          path="/films/:movieId"
          element={
            <MoviePageScreen films={films}/>
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
