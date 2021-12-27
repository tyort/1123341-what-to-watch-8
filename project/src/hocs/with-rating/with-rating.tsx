/* eslint-disable no-console */
import { ComponentType, FormEvent, useRef, useState } from 'react';
import AddReviewFormScreen from '../../components/add-review-form/add-review-form';

type HOCProps = {
  renderRating: (evt: FormEvent<HTMLInputElement>) => void;
};

function withRating<T>(Component: ComponentType<T>): ComponentType<Omit<T, keyof HOCProps>> {
  type ComponentProps = Omit<T, keyof HOCProps>;

  function WithRating(props: ComponentProps): JSX.Element {
    const [rating, setRating] = useState<number>(0);
    const [isBtnDisabled, setBtnDisabled] = useState<boolean>(true);
    const textRef = useRef<HTMLTextAreaElement | null>(null);

    return (
      <Component
        {...props as T}
        renderRating={(movieId: number) => {

          const onRateChange = (evt: FormEvent<HTMLInputElement>) => {
            setRating(Number(evt.currentTarget.value));

            if (textRef.current?.checkValidity() && textRef.current?.value !== '') {
              setBtnDisabled(false);
            }
          };

          const onTextChange = (evt: FormEvent<HTMLTextAreaElement>) => {
            if (evt.currentTarget.validity.valid && isBtnDisabled && rating !== 0 && textRef.current?.value !== '') {
              setBtnDisabled(false);

            } else if (!evt.currentTarget.validity.valid && !isBtnDisabled) {
              setBtnDisabled(true);
            }
          };

          return (
            <AddReviewFormScreen
              rating={rating}
              isBtnDisabled={isBtnDisabled}
              onRateChange={onRateChange}
              onTextChange={onTextChange}
              movieId={movieId}
              textRef={textRef}
            />
          );
        }}
      />
    );
  }

  return WithRating;
}

export default withRating;
