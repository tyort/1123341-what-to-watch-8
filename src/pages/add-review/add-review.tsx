/* eslint-disable camelcase */
import { Link, useParams, Navigate } from 'react-router-dom';
import {useState, ChangeEvent, Fragment, FormEvent} from 'react';
import {films} from '../../mocks/films';
import { Film } from '../../types/film';
import Logo from '../../components/logo/logo';

function AddReviewScreen(): JSX.Element {
  const [userComment, setUserComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const {movieId} = useParams();
  const currentMovie: Film | undefined = films.find((movie) => movie.id.toString() === movieId);

  if (!currentMovie) {
    return (
      <Navigate to="/non-existent-page" />
    );
  }

  const {name, preview_image, poster_image, background_image} = currentMovie;

  const handleTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>):void => {
    const {value} = evt.target;
    setUserComment(value);
  };

  const handleInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(target.value));
  };

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={background_image} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo isLight={false}/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to="/" className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to="/" className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src={preview_image} alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <Link to="/" className="user-block__link">Sign out</Link>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={poster_image} alt="The Grand Budapest Hotel poster" width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form
          action="#"
          className="add-review__form"
          onSubmit={(evt: FormEvent<HTMLFormElement>) => {
            evt.preventDefault();
            console.log('Чего бля?');
          }}
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
