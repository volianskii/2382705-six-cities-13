import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
  isAuth: boolean;
  children: JSX.Element;
};

function PrivateRoute (props: PrivateRouteProps): JSX.Element {
  const {isAuth, children} = props;

  return (
    isAuth ? children : <Navigate to = '/login' />
  );
}

export default PrivateRoute;
