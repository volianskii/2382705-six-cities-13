import { Comment } from '../../types/comment.ts';

type ReviewProps = {
  comment: Comment;
};

const Review = ({comment}: ReviewProps): JSX.Element => {
  const year = comment.date.slice(0, 4);
  let month = comment.date.slice(5, 7);

  switch (month) {
    case '01':
      month = 'January';
      break;
    case '02':
      month = 'February';
      break;
    case '03':
      month = 'March';
      break;
    case '04':
      month = 'April';
      break;
    case '05':
      month = 'May';
      break;
    case '06':
      month = 'June';
      break;
    case '07':
      month = 'July';
      break;
    case '08':
      month = 'August';
      break;
    case '09':
      month = 'September';
      break;
    case '10':
      month = 'October';
      break;
    case '11':
      month = 'November';
      break;
    case '12':
      month = 'December';
      break;
  }

  const roundedRating = Math.round(comment.rating);
  let ratingWidth = '0%';

  switch (roundedRating) {
    case 0:
      ratingWidth = '0%';
      break;
    case 1:
      ratingWidth = '20%';
      break;
    case 2:
      ratingWidth = '40%';
      break;
    case 3:
      ratingWidth = '60%';
      break;
    case 4:
      ratingWidth = '80%';
      break;
    case 5:
      ratingWidth = '100%';
      break;
  }

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={comment.user.avatarURL} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {comment.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: ratingWidth}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">{`${month} ${year}`}</time>
      </div>
    </li>
  );
};

export default Review;
