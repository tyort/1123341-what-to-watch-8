import {Navigate} from 'react-router-dom';

type PrivateFuckingRouteProps = {
  authorizationStatus: 'AUTH' | 'NO_AUTH' | 'UNKNOWN';
  children: JSX.Element;
}

function PrivateFuckingRoute(props: PrivateFuckingRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === 'AUTH'
      ? children
      : <Navigate to="/login" />
  );
}

export default PrivateFuckingRoute;
