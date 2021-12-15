import { ComponentType, FormEvent, useState } from 'react';
import AddReviewFormScreen from '../../components/add-review-form/add-review-form';

type HOCProps = {
  renderRating: (evt: FormEvent<HTMLInputElement>) => void;
};

function withRating<T>(Component: ComponentType<T>): ComponentType<Omit<T, keyof HOCProps>> {
  type ComponentProps = Omit<T, keyof HOCProps>;

  function WithRating(props: ComponentProps): JSX.Element {
    const [rating, setRating] = useState<number>(0);

    return (
      <Component
        {...props as T}
        renderRating={(movieId: number) => {
          const onRateChange = (evt: FormEvent<HTMLInputElement>) => {
            setRating(Number(evt.currentTarget.value));
          };

          return (
            <AddReviewFormScreen
              rating={rating}
              onRateChange={onRateChange}
              movieId={movieId}
            />
          );
        }}
      />
    );
  }

  return WithRating;
}

export default withRating;
