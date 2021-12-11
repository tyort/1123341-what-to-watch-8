import { Route, Switch, Router } from 'react-router-dom';
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
import LoadingScreen from '../loading/loading';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import {browserHistory} from '../../store/middlewares/redirect';

type AppScreenProps = {

}

const mapStateToProps = ({authorizationStatus, isDataLoaded}: State) => ({
  authorizationStatus,
  isDataLoaded,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & AppScreenProps;

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

function AppScreen(props: ConnectedComponentProps): JSX.Element {
  const {authorizationStatus, isDataLoaded} = props;

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
        {movies.map((movie) => (
          <Route key={movie.id} exact path={`${AppRoute.Films}/${movie.id}`}>
            <MovieScreen
              movie={movie}
              reviews={reviews}
            />
          </Route>
        ))}
        {movies.map((movie) => (
          <Route key={movie.id} exact path={`${AppRoute.Films}/${movie.id}/${AppRoute.PostfixReview}`}>
            <AddReviewScreen/>
          </Route>
        ))}
        <Route exact path={AppRoute.Player}>
          <PlayerScreen
            src={'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4'}
            autoPlay={false}
          />
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <SignInScreen/>
        </Route>
        {/* PrivateRoute наша обертка над Route */}
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyListScreen/>}
          authorizationStatus={authorizationStatus}
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
    </Router>
  );
}

export {AppScreen}; // поможет при тестировании
export default connector(AppScreen); // Связываем наш React-компонент с Redux
