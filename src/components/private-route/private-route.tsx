import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../types/authorization';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute (props: PrivateRouteProps): JSX.Element {
  const isAuth = useAppSelector((state) => state.authorizationStatus);
  const {children} = props;

  return (
    isAuth === AuthorizationStatus.Auth
      ? children
      : <Navigate to = '/login' />
  );
}

export default PrivateRoute;
