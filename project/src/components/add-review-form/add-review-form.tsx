import { FormEvent, Fragment, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { postCommentAction } from '../../store/api-actions-functions';
import { ThunkAppDispatch } from '../../types/action';

const STARS_COUNT = 10;

type AddReviewFormScreenProps = {
  rating: number;
  onRateChange: (evt: FormEvent<HTMLInputElement>) => void;
  movieId: number;
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onCommentPost(movieId: number, rating: number, comment: string) {
    dispatch(postCommentAction(movieId, rating, comment));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & AddReviewFormScreenProps;

function AddReviewFormScreen(props: ConnectedComponentProps): JSX.Element {
  const {movieId, rating, onRateChange, onCommentPost} = props;
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (textRef.current !== null) {
      const text = textRef.current.value;
      onCommentPost(movieId, rating, text);
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
                  <label className="rating__label" htmlFor={`star-${reversedIndex}`}>Rating {reversedIndex}</label>
                </Fragment>
              );},
            )}
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          ref={textRef}
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
        >
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
}

export {AddReviewFormScreen};
export default connector(AddReviewFormScreen);

