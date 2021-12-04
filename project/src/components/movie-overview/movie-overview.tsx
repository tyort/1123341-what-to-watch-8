/* eslint-disable camelcase */
import { getRatingLevel } from '../../const';
import { Movie } from '../../types/movie';

type MovieOverviewScreenProps = {
  movie: Movie;
}

function MovieOverviewScreen(props: MovieOverviewScreenProps): JSX.Element {
  const {rating, scores_count, description, director, starring} = props.movie;

  const ratingToStr = rating.toString().replace('.', ',');
  const ratingToWord = getRatingLevel(rating);

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{ratingToStr}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{ratingToWord}</span>
          <span className="film-rating__count">{scores_count} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>

        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {starring.join(', ')} and other</strong></p>
      </div>
    </>
  );
}

export default MovieOverviewScreen;

