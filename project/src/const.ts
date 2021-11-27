export enum AppRoute {
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  Main = '/',
  AddReview = '/films/:id/review',
  Player = '/player/:id'
}

export enum AuthorizationStatus {
  Auth = 'Authorised',
  NoAuth = 'Non-authorised'
}

export const getRatingLevel = (rating: number): string => {
  if (rating >=0 && rating < 3) {
    return 'Bad';
  } else if (rating >=3 && rating < 5) {
    return 'Normal';
  } else if (rating >=5 && rating < 8) {
    return 'Good';
  } else if (rating >=8 && rating < 10) {
    return 'Very good';
  } else {
    return 'Awesome';
  }
};

