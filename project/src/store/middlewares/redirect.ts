import {Middleware} from 'redux';
import {reducer} from '../reducer';
import {ActionName} from '../../types/action';
import {createBrowserHistory} from 'history';

type Reducer = ReturnType<typeof reducer>;
// Передадим этот объект в пропс Router(react-router-dom);
// Это необходимо для управления историей из слоев Redux;
export const browserHistory = createBrowserHistory();


export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {

        if (action.type === ActionName.RedirectToRoute) {
          browserHistory.push(action.payload);
        }

        // Здесь(перед next) можно использовать "действия" и "состояние" до изменения состояния "редьюсером"

        const result = next(action); // передаём action следующему middleware.

        // Здесь(после next) уже действие обработано редьюсером и мы имеем актуальный стейт

        return result;
      };
