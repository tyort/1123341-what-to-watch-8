/* eslint-disable camelcase */
import { useParams, Navigate } from 'react-router-dom';
import {useState, ChangeEvent, Fragment, FormEvent, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {films} from '../../mocks/films';
import { Film } from '../../types/film';
import Header from '../../components/header/header';
import { fetchPostCommentAction } from '../../store/api-actions';
import { getToken } from '../../services/token';
import { User } from '../../mocks/users';
import { hideErrorMessage, showErrorMessage } from '../../store/action';

function AddReviewScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const {currentComments} = useAppSelector((state) => state);
  const [userComment, setUserComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const {movieId} = useParams();
  const currentMovie: Film | undefined = films.find((movie) => movie.id.toString() === movieId);

  useEffect(() => {
    setUserComment('');
    setRating(0);
  }, [currentComments.length]);

  if (!currentMovie) {
    return (
      <Navigate to="/non-existent-page" />
    );
  }

  const {name, poster_image, background_image} = currentMovie;

  const handleTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>):void => {
    const {value} = evt.target;
    setUserComment(value);
  };

  const handleInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(target.value));
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const user = getToken() as User;
    const date = new Date().toISOString();

    if (rating !== 0 && userComment.trim() !== '') {
      dispatch(fetchPostCommentAction({
        user: {
          id: user.id,
          name: user.email,
        },
        rating,
        comment: userComment,
        date
      }));

    } else {
      dispatch(showErrorMessage('Введи данные корректно, пидарок'));
      const errorTime = setTimeout(() => {
        dispatch(hideErrorMessage());
        clearTimeout(errorTime);
      }, 5000);
    }
  };

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={background_image} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header currentScreen='AddReview'/>

        <div className="film-card__poster film-card__poster--small">
          <img src={poster_image} alt="The Grand Budapest Hotel poster" width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form
          action="#"
          className="add-review__form"
          onSubmit={handleFormSubmit}
        >
          <div className="rating">
            <div className="rating__stars">
              {
                new Array(10).fill('').map((_item, index, array) => {
                  const points = array.length - index;
                  return (
                    <Fragment key={points}>
                      <input
                        className="rating__input"
                        id={`star-${points}`}
                        type="radio"
                        name="rating"
                        value={points}
                        checked={rating === points}
                        onChange={handleInputChange}
                      />
                      <label className="rating__label" htmlFor={`star-${points}`}>Rating {points}</label>
                    </Fragment>
                  );
                })
              }
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              onChange={handleTextareaChange}
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              value={userComment}
            >
            </textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
}

export default AddReviewScreen;
