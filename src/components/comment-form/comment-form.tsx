import { ChangeEvent, FormEvent, useState } from 'react';
import StarButton from '../star-button/star-button.tsx';
import starButtonDetails from '../../constants/star-button-details';

function CommentForm(): JSX.Element {
  const [, setComment] = useState('first comment');
  const [, setRating] = useState('0');

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  const ratingChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setRating(event.target.value);
  };

  const textareaChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={submitHandler}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {starButtonDetails.map((starButton) => <StarButton key={starButton.title} onChangeHandler={ratingChangeHandler} details={starButton}/>)}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={textareaChangeHandler}></textarea>
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
