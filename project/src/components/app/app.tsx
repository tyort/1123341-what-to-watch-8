import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import MainScreen from '../main/main';
import MyListScreen from '../my-list/my-list';
import SignInScreen from '../sign-in/sign-in';
import PlayerScreen from '../player/player';
import MovieScreen from '../movie/movie';
import NotFoundScreen from '../not-found/not-found';
import AddReviewScreen from '../add-review/add-review';
import {movies} from '../../mocks/films';
import {reviews} from '../../mocks/reviews';

// onClick={() => {
//   Можно вызвать одну и ту же функцию обновления значения два раза подряд в одном колбэке при одном клике
//   setCounter((prevCounter) => ({
//       Предыдущее состояние
//       ...prevCounter,
//       count: prevCounter.count + 1,
//       incCount: prevCounter.incCount + 1,
//   }));
//   setCounter((prevCounter) => ({
//       ...prevCounter,
//       count: prevCounter.count + 1,
//       incCount: prevCounter.incCount + 1,
//   }));
// }}

type AppScreenProps = {

}

function AppScreen(props: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainScreen
            movies={movies}
          />
        </Route>
        <Route exact path={AppRoute.Film}>
          <MovieScreen/>
        </Route>
        <Route exact path={AppRoute.AddReview}>
          <AddReviewScreen/>
        </Route>
        <Route exact path={AppRoute.Player}>
          <PlayerScreen/>
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <SignInScreen/>
        </Route>
        {/* PrivateRoute наша обертка над Route */}
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyListScreen/>}
          authorizationStatus={AuthorizationStatus.NoAuth}
        />
        <Route>
          <NotFoundScreen/>
        </Route>
        {/*<Route path="/" exact component={MainScreen}/>
        Так компоненту в пропсы мы можем передать доп. параметры интерфейса Route,
        но "свои" пропсы передать не сможем(т.е. сложная задача)*/}

        {/*<Route
          render={(props) => {
            Обязательно возвращает JSX или null
            return (
              <Fragment>
                <h1>404.<br /><small>Page not found</small></h1>
                <Link to="/">Go to mainScreen page</Link>
              </Fragment>
            );
          }}
        />
        Без path перенаправление на любой несуществующий адрес
        Здесь также компоненту в пропсы мы можем передать доп. параметры интерфейса Route*/}

      </Switch>
    </BrowserRouter>
  );
}

export default AppScreen;
