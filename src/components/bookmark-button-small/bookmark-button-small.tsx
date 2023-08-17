import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user-data/selectors';
import classNames from 'classnames';
import { AuthorizationStatus } from '../../types/authorization';
import { addFavoritesAction, deleteFavoritesAction } from '../../store/api-actions';

type BookmarkButtonProps = {
  id: string;
  isActive: boolean;
};

function BookmarkButtonSmall({id, isActive}: BookmarkButtonProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(getAuthStatus);

  const handleClick = () => {
    if (isAuthorized !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }
    if(isActive) {
      dispatch(deleteFavoritesAction(id));
      //добавить в редюсер
    } else {
      //добавить в редюсер
      dispatch(addFavoritesAction(id));
    }
  };

  return (
    <button className={classNames('place-card__bookmark-button', 'button', {
      'place-card__bookmark-button--active': isActive && isAuthorized
    })} type="button" onClick={handleClick}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isActive && isAuthorized ? 'In' : 'To'} bookmarks</span>
    </button>
  );
}

export default BookmarkButtonSmall;
