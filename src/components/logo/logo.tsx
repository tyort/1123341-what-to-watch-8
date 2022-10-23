import {Link} from 'react-router-dom';

type LogoScreenProps = {
  isLight: boolean;
}

function Logo({isLight}: LogoScreenProps): JSX.Element {
  const isLightClass: string = isLight
    ? 'logo__link logo__link--light'
    : 'logo__link';

  return (
    <div className="logo">
      <Link className={isLightClass} to="/">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
