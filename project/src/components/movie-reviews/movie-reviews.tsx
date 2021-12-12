import {months} from '../../const';
import { State } from '../../types/state';
import { ThunkAppDispatch } from '../../types/action';
import { fetchCommentsAction } from '../../store/api-actions-functions';
import { connect, ConnectedProps } from 'react-redux';
import { useEffect } from 'react';

type  MovieReviewsScreenProps = {
  movieId: number
}

const mapStateToProps = ({comments}: State) => ({
  comments,
});

// redux добавляет пропсы-функции, влияющие на store, в пропсы компонента, т.к. изменения пропсов перерисовывают React-компонент.
// Dispatch<Actions> - дженерик помогает понять, что диспатчить мы можем только определенные действия.
const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onCommentsLoad(movieId: number) {
    dispatch(fetchCommentsAction(movieId));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MovieReviewsScreenProps;


function MovieReviewsScreen({movieId, comments, onCommentsLoad}: ConnectedComponentProps): JSX.Element {

  useEffect(() => {
    onCommentsLoad(movieId);
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

export {MovieReviewsScreen}; // поможет при тестировании
export default connector(MovieReviewsScreen); // Связываем наш React-компонент с Redux
