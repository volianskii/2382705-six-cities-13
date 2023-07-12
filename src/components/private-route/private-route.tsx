import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
  authorizationStatus: 'AUTH' | 'NO_AUTH' |'UNKNOWN';
  children: JSX.Element;
};

function PrivateRoute (props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === 'AUTH' ? children : <Navigate to = '/login' />
  );
}

export default PrivateRoute;
