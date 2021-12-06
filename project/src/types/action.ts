export enum ActionName {
  ChangeGenre = 'movies/changeGenre',
  IncreaseCount = 'movies/increaseCount'
}

export type ChangeGenreAction = {
  type: ActionName.ChangeGenre;
  payload: string;
};

export type IncreaseCountAction = {
  type: ActionName.IncreaseCount;
};

export type Actions =
  | ChangeGenreAction
  | IncreaseCountAction;
