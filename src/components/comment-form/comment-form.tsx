import {ChangeEvent, FormEvent, useState} from 'react';
import StarButton from '../star-button/star-button.tsx';
import starButtonDetails from '../../constants/star-button-details';

function CommentForm(): JSX.Element {
  const [, setComment] = useState('first comment');

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  const changeHandler = (event: ChangeEvent<HTMLElement>) => {
    const target = event.target as HTMLTextAreaElement;
    setComment(target.value);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={submitHandler}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {starButtonDetails.map((starButton) => <StarButton key={starButton.title} details={starButton}/>)}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={changeHandler}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
