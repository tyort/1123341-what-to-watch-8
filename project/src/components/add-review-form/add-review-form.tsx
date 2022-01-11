import { FormEvent, Fragment, MutableRefObject, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { failPostComment } from '../../store/actions-functions';
import { postCommentAction } from '../../store/api-actions-functions';
import { getComments, getPostCommentFailedStatus } from '../../store/comments-reducer/selectors';

const STARS_COUNT = 10;

type AddReviewFormScreenProps = {
  rating: number;
  onRateChange: (evt: FormEvent<HTMLInputElement>) => void;
  onTextChange: (evt: FormEvent<HTMLTextAreaElement>) => void;
  movieId: number;
  isBtnDisabled: boolean;
  textRef: MutableRefObject<HTMLTextAreaElement | null>;
}

function AddReviewFormScreen(props: AddReviewFormScreenProps): JSX.Element {
  const {textRef, movieId, rating, isBtnDisabled, onRateChange, onTextChange} = props;
  const isPostCommentFailed = useSelector(getPostCommentFailedStatus);
  const comments = useSelector(getComments);
  const dispatch = useDispatch();

  useEffect(() => {
    setFormDisabled(false);
  }, [comments]);

  useEffect(() => {
    if (isPostCommentFailed) {
      // Должен сработать: 1-Первая ошибка; 2-На каждой ошибке; 3-Ошибка после удачной отправки.
      setFormDisabled(false);
      dispatch(failPostComment(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPostCommentFailed]);

  const [isFormDisabled, setFormDisabled] = useState<boolean>(false);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (textRef.current !== null) {
      setFormDisabled(true);
      const text = textRef.current.value;
      dispatch(postCommentAction(movieId, rating, text));
    }
  };

  return (
    <form
      action="#"
      className="add-review__form"
      onSubmit={handleFormSubmit}
    >
      <div className="rating">
        <div className="rating__stars">
          {new Array(STARS_COUNT)
            .fill('')
            .map((_, index) => {
              const reversedIndex: number = STARS_COUNT - index;
              return (
              // eslint-disable-next-line react/no-array-index-key
                <Fragment key={index}>
                  <input
                    className="rating__input"
                    id={`star-${reversedIndex}`}
                    type="radio"
                    name="rating"
                    value={reversedIndex}
                    onChange={onRateChange}
                    checked={rating === reversedIndex}
                  />
                  <label
                    className="rating__label"
                    htmlFor={`star-${reversedIndex}`}
                    style={isFormDisabled
                      ? { pointerEvents: 'none' }
                      : { pointerEvents: 'auto' }}
                  >
                    Rating {reversedIndex}
                  </label>
                </Fragment>
              );},
            )}
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          onChange={onTextChange}
          maxLength={400}
          minLength={50}
          ref={textRef}
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          disabled={isFormDisabled}
        >
        </textarea>
        <div className="add-review__submit">
          <button
            className="add-review__btn"
            type="submit"
            disabled={isBtnDisabled || isFormDisabled}
          >
            Post
          </button>
        </div>

      </div>
    </form>
  );
}

export default AddReviewFormScreen;
