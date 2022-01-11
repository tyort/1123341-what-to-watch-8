import {Middleware} from 'redux';
import {State} from '../../types/state';
import {ActionName} from '../../types/action';
import {createBrowserHistory} from 'history';

// Передадим этот объект в пропс Router(react-router-dom);
// Это необходимо для управления историей из слоев Redux;
export const browserHistory = createBrowserHistory();

export const redirect: Middleware<unknown, State> =
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
