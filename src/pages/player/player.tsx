/* eslint-disable camelcase */
/* eslint-disable no-console */
import { formatRemainingTime } from '../../utils';
import { Film } from '../../types/film';
import { useState, useEffect, useRef } from 'react';

type PlayerScreenProps = {
  film: Film;
}

function PlayerScreen({film}: PlayerScreenProps): JSX.Element {
  const {video_link, background_image} = film;
  const videoElement = useRef<HTMLVideoElement | null>(null); // ссылка на видеоэлемент
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false
  });

  // меняем значение isPlaying на обратное
  const togglePlay = () => {
    const {isPlaying} = playerState;

    setPlayerState({
      ...playerState,
      isPlaying: !isPlaying,
    });
  };

  // Реакция api на isPlaying
  useEffect(() => {
    playerState.isPlaying
      ? (videoElement.current as HTMLVideoElement).play()
      : (videoElement.current as HTMLVideoElement).pause();
  }, [playerState.isPlaying, videoElement]);

  useEffect(() => {
    videoElement.current?.ended && setPlayerState({
      ...playerState,
      isPlaying: false
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(videoElement.current as HTMLVideoElement).ended]);

  // Сколько видео просмотрено
  const handleOnTimeUpdate = () => {
    const progress = ((videoElement.current as HTMLVideoElement).currentTime / (videoElement.current as HTMLVideoElement).duration) * 100;
    setPlayerState({
      ...playerState,
      progress,
    });
  };

  return (
    <div className="player">
      <video
        autoPlay={false}
        src={video_link}
        ref={videoElement}
        onTimeUpdate={handleOnTimeUpdate}
        className="player__video"
        poster={background_image}
      >
      </video>

      <button type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value={playerState.progress} // визуализация "шкалы" прогресса. Любое число относительно 100.
              max="100"
              onChange={handleOnTimeUpdate}
            >
            </progress>
            <input
              type="range"
              min="0"
              max="100"
              className="player__toggler"
              style={{left: `${playerState.progress}%`}}
            />
          </div>
          <div className="player__time-value">
            {formatRemainingTime((videoElement.current?.duration as number) - (videoElement.current?.currentTime as number))}
          </div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={togglePlay}
          >
            {
              playerState.isPlaying
                ?
                <svg width="14px" height="21px" viewBox="0 0 14 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <title>Artboard</title>
                  <desc>Created with Sketch.</desc>
                  <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21"></polygon>
                    <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21"></polygon>
                  </g>
                </svg>
                :
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
            }
            <span>Play</span>
          </button>
          <div className="player__name">{film.name}</div>

          <button type="button" className="player__full-screen">
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
