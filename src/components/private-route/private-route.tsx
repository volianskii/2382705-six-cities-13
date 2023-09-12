import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../types/authorization';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

type PrivateRouteProps = {
  isAuth: AuthorizationStatus;
  children: JSX.Element;
};

function PrivateRoute (props: PrivateRouteProps): JSX.Element {
  const {children, isAuth} = props;

  if (isAuth === AuthorizationStatus.Unknown) {
    return (
      <LoadingScreen />
    );
  }

  return (
    isAuth === AuthorizationStatus.Auth
      ? children
      : <Navigate to = '/login' />
  );
}

export default PrivateRoute;
