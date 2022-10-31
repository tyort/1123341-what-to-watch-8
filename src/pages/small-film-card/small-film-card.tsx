import {Film} from '../../types/film';
import { Link } from 'react-router-dom';
import {MouseEvent, useEffect, useRef, useState} from 'react';

type SmallFilmCardScreenProps = {
  id?: never;
  film: Film;
  getHoveredFilm: (movie: Film | null) => void;
}

function SmallFilmCardScreen({film, getHoveredFilm}: SmallFilmCardScreenProps): JSX.Element {
  const [mayPlay, setMayPlay] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoElement = useRef<HTMLVideoElement | null>(null);

  const handleCanplayVideo = () => {
    setMayPlay(true);
  };

  useEffect(() => {
    videoElement.current?.addEventListener('canplay', handleCanplayVideo);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      videoElement.current?.removeEventListener('canplay', handleCanplayVideo);
    };
  }, [film]);

  useEffect(() => {
    if (mayPlay) {
      const videoDelay = setTimeout(() => {
        if (isPlaying) {
          videoElement.current?.play();
        } else {
          clearTimeout(videoDelay);
          videoElement.current?.load();
        }
      }, 1000);
    }
  }, [isPlaying, mayPlay]);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={(evt: MouseEvent<HTMLElement>):void => {
        getHoveredFilm(film);
        setIsPlaying(true);
      }}
      onMouseLeave={(evt: MouseEvent<HTMLElement>):void => {
        getHoveredFilm(null);
        setIsPlaying(false);
      }}
    >
      <div className="small-film-card__image">
        <video
          style={{objectFit: 'cover', width: '100%', height: '100%'}}
          poster={film.preview_image}
          ref={videoElement}
          loop
          muted
        >
          <source src={film.preview_video_link} type="video/webm"/>
        </video>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default SmallFilmCardScreen;
