import {Navigate} from 'react-router-dom';
import {PropsWithChildren} from 'react';
import {useAppSelector} from '../../hooks';

function PrivateFuckingRoute(props: PropsWithChildren) {
  const {children} = props;
  const {authorizationStatus} = useAppSelector((state) => state);

  return (
    authorizationStatus === 'AUTH'
      ? <> {children}</>
      : <Navigate to="/login" />
  );
}

export default PrivateFuckingRoute;
