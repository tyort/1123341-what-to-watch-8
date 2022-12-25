import './error-message.css';
import { useAppSelector} from '../../hooks';

function ErrorMessage(): JSX.Element | null {
  const {errorMessage} = useAppSelector((state) => state);

  return errorMessage === undefined
    ? null
    : <div className='error-message'>{errorMessage}</div>;
}

export default ErrorMessage;
