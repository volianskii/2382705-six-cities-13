import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../types/authorization';

type PrivateRouteProps = {
  isAuth: AuthorizationStatus;
  children: JSX.Element;
};

function PrivateRoute (props: PrivateRouteProps): JSX.Element {
  const {children, isAuth} = props;

  return (
    isAuth === AuthorizationStatus.Auth
      ? children
      : <Navigate to = '/login' />
  );
}

export default PrivateRoute;
