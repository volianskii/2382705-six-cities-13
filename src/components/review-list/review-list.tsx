import {OfferType} from '../../mocks/offers';
import Review from '../review/review.tsx';

type ReviewListProps = {
  offer: OfferType;
};

const ReviewList = ({offer}: ReviewListProps): JSX.Element => (
  <ul className="reviews__list">
    {offer.reviews.map((review, reviewId) => {
      const keyValue = `${reviewId}-review`;
      return (
        <Review key={keyValue} review={review} />
      );
    })}
  </ul>
);

export default ReviewList;
