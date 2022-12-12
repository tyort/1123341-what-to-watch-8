import {Navigate} from 'react-router-dom';
import {PropsWithChildren} from 'react';


type PrivateFuckingRouteProps = PropsWithChildren<{
  authorizationStatus: 'AUTH' | 'NO_AUTH' | 'UNKNOWN';
}>

function PrivateFuckingRoute(props: PrivateFuckingRouteProps) {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === 'AUTH'
      ? children
      : <Navigate to="/login" />
  );
}

export default PrivateFuckingRoute;
