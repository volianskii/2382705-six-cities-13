export type StarButtonDetailsType = {
  value: number;
  title: string;
}

type StarButtonProps = {
  key: string;
  details: StarButtonDetailsType;
}

function StarButton({key, details}: StarButtonProps): JSX.Element {
  return (
    <>
      <input className="form__rating-input visually-hidden" key={key} name="rating" value={details.value} id={`${details.value}-stars`} type="radio" />
      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title={details.title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default StarButton;
