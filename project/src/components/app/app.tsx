import { Route, Switch, Router } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import MainScreen from '../main/main';
import MyListScreen from '../my-list/my-list';
import SignInScreen from '../sign-in/sign-in';
import PlayerScreen from '../player/player';
import MovieScreen from '../movie/movie';
import NotFoundScreen from '../not-found/not-found';
import NoMovieScreen from '../no-film/no-film';
import AddReviewScreen from '../add-review/add-review';
import LoadingScreen from '../loading/loading';
import WithRating from '../../hocs/with-rating/with-rating';
import {browserHistory} from '../../store/middlewares/redirect';
import { getAuthStatus } from '../../store/user-reducer/selectors';
import { getAllMovies, getMoviesLoadStatus } from '../../store/movies-reducer/selectors';

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

const AddReviewScreenWrapped = WithRating(AddReviewScreen);

function AppScreen(): JSX.Element {
  const authorizationStatus = useSelector(getAuthStatus);
  const isDataLoaded = useSelector(getMoviesLoadStatus);
  const allMovies = useSelector(getAllMovies);

  if (authorizationStatus === AuthorizationStatus.Unknown || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Router history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainScreen/>
        </Route>
        {allMovies.map((movie) => (
          <Route key={movie.id} exact path={`${AppRoute.Films}/${movie.id}`}>
            <MovieScreen
              movie={movie}
            />
          </Route>
        ))}
        {allMovies.map((movie) => (
          <PrivateRoute
            key={movie.id}
            exact
            path={`${AppRoute.Films}/${movie.id}/${AppRoute.PostfixReview}`}
            render={() => <AddReviewScreenWrapped movie={movie}/>}
            authorizationStatus={authorizationStatus}
          />
        ))}
        {allMovies.map((movie) => (
          <Route key={movie.id} exact path={`${AppRoute.Player}/${movie.id}`}>
            <PlayerScreen
              movie={movie}
            />
          </Route>
        ))}
        <Route exact path={AppRoute.SignIn}>
          <SignInScreen/>
        </Route>
        {/* PrivateRoute наша обертка над Route (вместо Route) */}
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyListScreen/>}
          authorizationStatus={authorizationStatus}
        />
        <Route path={AppRoute.Films}>
          <NoMovieScreen/>
        </Route>
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
    </Router>
  );
}

export default AppScreen;
