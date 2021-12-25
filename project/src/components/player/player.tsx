import { useEffect, useRef, useState } from 'react';

type PlayerScreenProps = {
  autoPlay: boolean; // указываем стоит ли воспроизводить видео автоматически после рендера компонента
  src: string; // передаем путь к фильму
}

function PlayerScreen(props: PlayerScreenProps): JSX.Element {
  const {src, autoPlay} = props;
  const [isLoading, setIsLoading] = useState(true); // Загружается ли файл
  const [isPlaying, setIsPlaying] = useState(autoPlay); // Проигрывается ли сейчас фильм

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
  }, [src]);

  useEffect(() => {
    if (videoRef.current !== null) {
      isPlaying
        ? videoRef.current.play()
        : videoRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="player">
      <video
        src={src}
        className="player__video"
        ref={videoRef}
      >
        <source src={src} type="video/webm"/>
      </video>

      <button type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
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
          <div className="player__name">Transpotting</div>

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
