import MovieDetailsScreen from '../movie-details/movie-details';
import MovieOverviewScreen from '../movie-overview/movie-overview';
import MovieReviewsScreen from '../movie-reviews/movie-reviews';
import {NavigationItemTitle} from '../../const';
import { Movie } from '../../types/movie';

type MovieNavScreenprops = {
  screenName: string;
  movie: Movie;
}

function MovieNavScreen(props: MovieNavScreenprops): JSX.Element {
  const {screenName, movie} = props;
  switch (screenName) {
    case NavigationItemTitle.Reviews:
      return (
        <MovieReviewsScreen
          movieId={movie.id}
        />
      );
    case NavigationItemTitle.Details:
      return (
        <MovieDetailsScreen
          movie={movie}
        />
      );
    default:
      return (
        <MovieOverviewScreen
          movie={movie}
        />
      );
  }
}

export default MovieNavScreen;
