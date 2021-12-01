/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';

type PreviewPlayerScreenProps = {
  src: string; // передаем путь к фильму
  poster: string;
  isPlaying: boolean;
}

function PreviewPlayerScreen(props: PreviewPlayerScreenProps): JSX.Element {
  const {src, poster, isPlaying} = props;
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current !== null) {
      videoRef.current.onloadeddata = () => setIsLoading(false);
    }

    return () => {
      if (videoRef.current !== null) {
        videoRef.current.onloadeddata = null;
        videoRef.current = null;
      }
    };
  }, [src]);

  useEffect(() => {
    if (videoRef.current !== null && !isLoading) {
      isPlaying
        ? videoRef.current.play()
        : videoRef.current.load();
    }
  }, [isPlaying, isLoading]);

  return (
    <video
      poster={poster}
      ref={videoRef}
      width="280"
      height="175"
      loop
      muted
    >
      <source src={src} type="video/webm"/>
    </video>
  );
}

export default PreviewPlayerScreen;
