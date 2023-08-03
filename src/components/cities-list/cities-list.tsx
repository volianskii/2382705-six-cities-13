import {changeCity} from '../../store/action';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {CITIES} from '../../mocks/city.ts';


function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const clickHandler = (event: React.MouseEvent<HTMLSpanElement>) => {
    const target = event.target as HTMLSpanElement;
    dispatch(changeCity(target.innerHTML));
  };
  const currentCity = useAppSelector((state) => state.city);

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city, id) => {
        const keyValue = `${id}-city`;
        return (
          <li key={keyValue} className="locations__item">
            <a className={`locations__item-link tabs__item ${city.name === currentCity ? 'tabs__item--active' : ''}`} href="#">
              <span onClick={clickHandler}>{city.name}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default CitiesList;
