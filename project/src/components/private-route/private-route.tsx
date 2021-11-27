import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

// RouteProps - это пропсы, как у Route. Теперь PrivateRoute аналог Route;
type PrivateRouteScreenProps = RouteProps & {
  render: () => JSX.Element;
  authorizationStatus: AuthorizationStatus;
}

function PrivateRouteScreen(props: PrivateRouteScreenProps): JSX.Element {
  const {exact, path, render, authorizationStatus} = props;
  return (
    <Route
      exact={exact}
      path={path}
      // переопределяем render
      render={() => (
        authorizationStatus === AuthorizationStatus.NoAuth
          ? render() // отрисовка компонента, который мы указали в App
          : <Redirect to={AppRoute.SignIn} />
      )}
    />
  );
}

export default PrivateRouteScreen;
