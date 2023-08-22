import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import StarButton from '../star-button/star-button.tsx';
import starButtonDetails from '../../constants/star-button-details';
import { Data } from '../../types/comment.ts';
import { addCommentAction } from '../../store/api-actions.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/index.ts';
import { getFormDisabledStatus } from '../../store/comments-data/selectors.ts';
/* import { toast } from 'react-toastify'; */
type CommentFormProps = {
  id: string | undefined;
}

function CommentForm({id}: CommentFormProps): JSX.Element {
  const [comment, setComment] = useState('null');
  const [rating, setRating] = useState('0');
  const [error, setError] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const dispatch = useAppDispatch();
  const isFormDisabled = useAppSelector(getFormDisabledStatus);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);


  const onSubmit = (data: Data) => {
    dispatch(addCommentAction(data));
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id) {
      onSubmit({
        commentData: {
          comment: comment,
          rating: Number(rating),
        },
        offerId: id,
      });
      textAreaRef.current.value = '';
    }
  };

  const ratingChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setRating(event.target.value);
  };

  const textareaChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if ((event.target.value.length >= 50) && (event.target.value.length <= 300)) {
      setError(false);
      setComment(event.target.value);
    } else {
      setError(true);
      setDisabled(true);
    }
  };

  useEffect(() => {
    if((comment.length >= 50) && (comment.length <= 300) && rating !== '0') {
      setDisabled(false);
    }
  }, [rating, comment]);
  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={submitHandler}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {starButtonDetails.map((starButton) => <StarButton key={starButton.title} onChangeHandler={ratingChangeHandler} details={starButton}/>)}
      </div>
      <textarea ref={textAreaRef} disabled={isFormDisabled} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={textareaChangeHandler}></textarea>
      {error ?
        <p style={{fontSize: '10px', color: 'red', margin: '0'}}>The length of the comment must be at least 50 and a maximum of 300 characters</p> :
        null}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" disabled={isDisabled} type="submit">Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
