import classNames from 'classnames';

import { changeCity } from '../../store/offers-data/offers-data.ts';
import { getActiveCity } from '../../store/offers-data/selectors.ts';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { CITIES } from '../../constants/city.ts';


function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getActiveCity);
  const clickHandler = (city: string) => {
    dispatch(changeCity(city));
  };

  return (
    <ul className="locations__list tabs__list" data-testid='citiesListComponent'>
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
