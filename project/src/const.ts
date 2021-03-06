import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export enum AppRoute {
  SignIn = '/login',
  MyList = '/mylist',
  Films = '/films',
  Main = '/',
  PostfixReview = 'review',
  Player = '/player'
}

export enum ResponseText {
  NoInternet = 'Нет подключения к интернету',
  PostFail = 'Неправильный адрес запроса',
  PassFail = 'Пароль должен состоять минимум из одной буквы и цифры'
}

export enum AuthorizationStatus {
  Auth = 'Authorised',
  NoAuth = 'Non-authorised',
  Unknown = 'UNKNOWN', // когда приложение только стартует
}

// Запросы на бэкэнд
export enum APIRoute {
  Movies = '/films',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Promo = '/promo',
  Favorite = '/favorite',
  PostfixSimilar = 'similar',
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

export const getFilmDuration = (filmDuration: number): string => {
  if (filmDuration < 60) {
    return `${filmDuration}m`;
  } else if (filmDuration > 60) {
    return `${Math.trunc(filmDuration / 60)}h ${filmDuration % 60}m`;
  } else {
    return '1h';
  }
};

export const passPattern = /^(?=.*[A-Za-z])(?=.*\d)/i;

export const formatRemainingTime = (remainingTime: number): string => {
  const format = remainingTime >= 3600 ? '-HH:mm:ss' : '-mm:ss';
  return dayjs.duration(remainingTime, 'seconds').format(format);
};
