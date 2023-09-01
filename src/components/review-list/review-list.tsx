import { Comment } from '../../types/comment.ts';
import { sortComments } from '../../utils/sorting-comments.ts';
import Review from '../review/review.tsx';

type ReviewListProps = {
  comments: Comment[];
};

const MAX_COMMENTS_AMOUNT = 10;

const ReviewList = ({comments}: ReviewListProps): JSX.Element => {
  const newComments = sortComments(comments).slice(0, MAX_COMMENTS_AMOUNT);
  return (
    <ul className="reviews__list">
      {newComments.map((comment, commentId) => {
        const keyValue = `${commentId}-review`;
        return (
          <Review key={keyValue} comment={comment} />
        );
      })}
    </ul>
  );
};
export default ReviewList;
