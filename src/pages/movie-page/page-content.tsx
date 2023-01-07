import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchGetCommentsAction } from '../../store/api-actions';

type MoviePageChildScreenProps = {
  menuItem: string;
}

function MoviePageChildScreen({menuItem}: MoviePageChildScreenProps):JSX.Element {
  const {currentComments} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGetCommentsAction());
  }, []);

  switch (menuItem) {
    case 'Details':
      return (
        <div className="film-card__text film-card__row">
          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Director</strong>
              <span className="film-card__details-value">Wes Anderson</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Starring</strong>
              <span className="film-card__details-value">
                Bill Murray, <br/>
                Edward Norton, <br/>
                Jude Law, <br/>
                Willem Dafoe, <br/>
                Saoirse Ronan, <br/>
                Tony Revoloru, <br/>
                Tilda Swinton, <br/>
                Tom Wilkinson, <br/>
                Owen Wilkinson, <br/>
                Adrien Brody, <br/>
                Ralph Fiennes, <br/>
                Jeff Goldblum
              </span>
            </p>
          </div>

          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Run Time</strong>
              <span className="film-card__details-value">1h 39m</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Genre</strong>
              <span className="film-card__details-value">Comedy</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Released</strong>
              <span className="film-card__details-value">2014</span>
            </p>
          </div>
        </div>
      );
    case 'Reviews':
      return (
        <div className="film-card__reviews film-card__row">
          <div className="film-card__reviews-col">
            {currentComments.map((comment) => {
              const dateTime: string = comment.date.split('T')[0];
              const dateAsContent = new Date(comment.date).toDateString();
              return (
                <div key={comment.id} className="review">
                  <blockquote className="review__quote">
                    <p className="review__text">{comment.comment}</p>

                    <footer className="review__details">
                      <cite className="review__author">{comment.user.name}</cite>
                      <time className="review__date" dateTime={dateTime}>{dateAsContent}</time>
                    </footer>
                  </blockquote>

                  <div className="review__rating">{comment.rating.toString().replace('.', ',')}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    default:
      return (
        <>
          <div className="film-rating">
            <div className="film-rating__score">8,9</div>
            <p className="film-rating__meta">
              <span className="film-rating__level">Very good</span>
              <span className="film-rating__count">240 ratings</span>
            </p>
          </div>

          <div className="film-card__text">
            <p>In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&apos;s friend and protege.</p>

            <p>Gustave prides himself on providing first-class service to the hotel&apos;s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave&apos;s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.</p>

            <p className="film-card__director"><strong>Director: Wes Anderson</strong></p>

            <p className="film-card__starring"><strong>Starring: Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other</strong></p>
          </div>
        </>
      );
  }
}

export default MoviePageChildScreen;
