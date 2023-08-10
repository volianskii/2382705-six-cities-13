import {changeCity} from '../../store/action';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {CITIES} from '../../constants/city.ts';
import classNames from 'classnames';

function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const clickHandler = (city: string) => {
    dispatch(changeCity(city));
  };
  const currentCity = useAppSelector((state) => state.city);

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city, id) => {
        const keyValue = `${id}-city`;
        return (
          <li onClick={() => clickHandler(city.name)} key={keyValue} className="locations__item">
            <a className={classNames('locations__item-link', 'tabs__item', {'tabs__item--active': city.name === currentCity})} href="#">
              <span>{city.name}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default CitiesList;
