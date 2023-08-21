import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../types/authorization';
import { getAuthStatus } from '../../store/user-data/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute (props: PrivateRouteProps): JSX.Element {
  const isAuth = useAppSelector(getAuthStatus);
  const {children} = props;

  return (
    isAuth === AuthorizationStatus.Auth
      ? children
      : <Navigate to = '/login' />
  );
}

export default PrivateRoute;
