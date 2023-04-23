import { FilmList } from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import UserIcon from '../../components/user/user';
import { useAppSelector } from '../../hooks';
import { getFavoriteFilms } from '../../store/app-process/selectors';

export default function MyListScreen(): JSX.Element {
  const films = useAppSelector(getFavoriteFilms);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{films.length}</span></h1>
        <UserIcon />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList films={films} />
      </section>

      <Footer />
    </div>
  );

}
