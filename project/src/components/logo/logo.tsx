import { Link } from 'react-router-dom';

const HEADER_AS_WORD = 'header';

type LogoScreenProps = {
  place?: string;
}

function LogoScreen(props: LogoScreenProps): JSX.Element {
  const {place = HEADER_AS_WORD} = props;

  return (
    <div className="logo">
      <Link to="/" className={`logo__link ${place !== HEADER_AS_WORD ? 'logo__link--light' : ''}`}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default LogoScreen;
