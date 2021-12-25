/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import { Movie } from '../../types/movie';

type PreviewPlayerScreenProps = {
  movie: Movie;
  isPlaying: boolean;
}

function PreviewPlayerScreen(props: PreviewPlayerScreenProps): JSX.Element {
  const {isPlaying, movie} = props;
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
  }, [movie]);

  useEffect(() => {
    if (videoRef.current !== null && !isLoading) {
      isPlaying
        ? videoRef.current.play()
        : videoRef.current.load();
    }
  }, [isPlaying, isLoading]);

  return (
    <video
      poster={movie.preview_image}
      ref={videoRef}
      width="280"
      height="175"
      loop
      muted
    >
      <source src={movie.preview_video_link} type="video/webm"/>
    </video>
  );
}

export default PreviewPlayerScreen;
