export enum ActionName {
  ChangeGenre = 'movies/changeGenre',
}

export type ChangeGenreAction = {
  type: ActionName.ChangeGenre;
  payload: string;
};

export type Actions = ChangeGenreAction;
