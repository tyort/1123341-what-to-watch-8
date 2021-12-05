export enum AppRoute {
  SignIn = '/login',
  MyList = '/mylist',
  Films = '/films',
  Main = '/',
  PostfixReview = 'review',
  Player = '/player/:id'
}

export enum AuthorizationStatus {
  Auth = 'Authorised',
  NoAuth = 'Non-authorised'
}

export enum NavigationItemTitle {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews'
}

export const months = new Map([
  [0, 'January'],
  [1, 'February'],
  [2, 'March'],
  [3, 'April'],
  [4, 'May'],
  [5, 'June'],
  [6, 'July'],
  [7, 'August'],
  [8, 'September'],
  [9, 'October'],
  [10, 'November'],
  [11, 'December'],
]);

export const genres = [
  'All genres',
  'Comedies',
  'Crime',
  'Documentary',
  'Dramas',
  'Horror',
  'Kids & Family',
  'Romance',
  'Sci-Fi',
  'Thrillers',
];

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

export const getFilmDuration = (duration: number): string => {
  if (duration < 60) {
    return `${duration}m`;
  } else if (duration > 60) {
    return `${Math.trunc(duration / 60)}h ${duration % 60}m`;
  } else {
    return '1h';
  }
};

