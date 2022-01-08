/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { formatRemainingTime } from '../../const';
import { Movie } from '../../types/movie';
import Spinner from '../spinner/spinner';

type PlayerScreenProps = {
  movie: Movie;
}

function PlayerScreen(props: PlayerScreenProps): JSX.Element {
  const {movie} = props;
  const [isLoading, setIsLoading] = useState(true); // Загружается ли файл
  const [isPlaying, setIsPlaying] = useState(true); // Проигрывается ли сейчас фильм
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const history = useHistory();

  const videoToArray = movie.video_link.split('.');
  const videoFormat = videoToArray[videoToArray.length - 1];
  const getTImePercent = (): number => duration ? (100 / duration * currentTime) : 0;

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Записан ли у нас DOM-элемент
    if (videoRef.current !== null) {
      // Устанавливаем обработчик события onloadeddata:
      // если файл уже загружен(готов для воспроизведения), то isLoading присваиваем false
      videoRef.current.onloadeddata = () => setIsLoading(false);
    }

    // Выполнится, при отмонтировании компонента
    return () => {
      // eslint-disable-next-line no-console
      console.log('componentWillUnmount');

      if (videoRef.current !== null) {
        videoRef.current.onloadeddata = null; // удаляем обработчик события onloadeddata
        videoRef.current = null; // удаляем ссылку на DOM-элемент
      }
    };
  }, [movie]);

  useEffect(() => {
    if (videoRef.current !== null) {
      isPlaying
        ? videoRef.current.play().catch(() => setIsPlaying(false))
        : videoRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="player">
      {isLoading ? <Spinner /> : ''}
      <video
        className="player__video"
        ref={videoRef}
        preload='metadata'
        onLoadStart={() => setIsLoading(true)}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onTimeUpdate={() => setCurrentTime(Math.round(videoRef.current?.currentTime as number))}
        onDurationChange={() => setDuration(Math.round(videoRef.current?.duration as number))}
        style={isLoading ? { display: 'none' } : { display: 'inline' }}
      >
        <source src={movie.video_link} type={`video/${videoFormat}`}/>
      </video>

      <button
        type="button"
        className="player__exit"
        onClick={() => history.goBack()}
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: `${getTImePercent()}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">
            {formatRemainingTime(duration - currentTime)}
          </div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            disabled={isLoading}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying
              ?
              <>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </>
              :
              <>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </>}
          </button>
          <div className="player__name">{movie.name}</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={() => videoRef.current?.requestFullscreen()}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerScreen;
