import { Review } from '../../types/review';
import {months} from '../../const';

type  MovieReviewsScreenProps = {
  reviews: Review[]
}

function MovieReviewsScreen({reviews}: MovieReviewsScreenProps): JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map((review) => {
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
