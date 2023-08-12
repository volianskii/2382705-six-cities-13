import { ChangeEvent } from 'react';

export type StarButtonDetailsType = {
  value: number;
  title: string;
}

type StarButtonProps = {
  key: string;
  details: StarButtonDetailsType;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};

function StarButton({key, details, onChangeHandler}: StarButtonProps): JSX.Element {
  return (
    <>
      <input className="form__rating-input visually-hidden" onChange={onChangeHandler} key={key} name="rating" value={details.value} id={`${details.value}-stars`} type="radio" />
      <label htmlFor={`${details.value}-stars`} className="reviews__rating-label form__rating-label" title={details.title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default StarButton;
