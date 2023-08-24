import './error-page.css';

import { useAppDispatch } from '../../hooks/index';
import { fetchOfferAction } from '../../store/api-actions';

function ErrorPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const clickHandler = (): void => dispatch(fetchOfferAction());

  return (
    <div className='container-center'>
      <h3> Не удалось загрузить предложения для аренды </h3>
      <button onClick={clickHandler}>Попробовать еще раз</button>
    </div>
  );
}

export default ErrorPage;
