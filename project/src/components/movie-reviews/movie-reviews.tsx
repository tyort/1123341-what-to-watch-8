import {useDispatch, useSelector} from 'react-redux';
import {months} from '../../const';
import { fetchCommentsAction } from '../../store/api-actions-functions';
import { useEffect } from 'react';
import { getComments } from '../../store/comments-reducer/selectors';

type MovieReviewsScreenProps = {
  movieId: number
}

function MovieReviewsScreen({movieId}: MovieReviewsScreenProps): JSX.Element {
  const comments = useSelector(getComments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommentsAction(movieId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.map((review) => {
          const {id, comment, user, rating, date} = review;
          const ratingToStr = rating.toString().replace('.', ',');
          const strAsDate = new Date(date);
          const dateTime = `${strAsDate.getFullYear()}-${strAsDate.getMonth() + 1}-${strAsDate.getDate()}`;
          const dateAsText = `${months.get(strAsDate.getMonth())} ${strAsDate.getDate()}, ${strAsDate.getFullYear()}`;

          return (
            <div key={id} className="review">
              <blockquote className="review__quote">
                <p className="review__text">{comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{user.name}</cite>
                  <time className="review__date" dateTime={dateTime}>{dateAsText}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{ratingToStr}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MovieReviewsScreen;
