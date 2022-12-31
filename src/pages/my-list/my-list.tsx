import { Link } from 'react-router-dom';
import LogoScreen from '../../components/logo/logo';
import CatalogFilmsListScreen from '../catalog-films-list/catalog-films-list';
import {Film} from '../../types/film';
import HeaderScreen from '../../components/header/header';

type MyListScreenProps = {
  films: Film[];
}

function MyListScreen({films}: MyListScreenProps): JSX.Element {
  return (
    <div className="user-page">
      <HeaderScreen currentScreen='UserPage' />

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <CatalogFilmsListScreen films={films}/>
      </section>

      <footer className="page-footer">
        <LogoScreen isLight/>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyListScreen;
