import { FormEvent, Fragment } from 'react';

const STARS_COUNT = 10;

function AddReviewFormScreen(): JSX.Element {
  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
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
              const reversedIndex = STARS_COUNT - index;
              return (
              // eslint-disable-next-line react/no-array-index-key
                <Fragment key={index}>
                  <input className="rating__input" id={`star-${reversedIndex}`} type="radio" name="rating" value={reversedIndex} />
                  <label className="rating__label" htmlFor={`star-${reversedIndex}`}>Rating {reversedIndex}</label>
                </Fragment>
              );},
            )}
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
}

export default AddReviewFormScreen;

