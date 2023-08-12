import { Link } from 'react-router-dom';
import style from './style.module.css';

function Page404(): JSX.Element {
  return (
    <div className={style.body}>
      <div className={style.form}>
        <h1>404</h1>
        <p>page not found</p>
        <form>
          <Link to='/'>
            <button>
              To Main Page
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Page404;
