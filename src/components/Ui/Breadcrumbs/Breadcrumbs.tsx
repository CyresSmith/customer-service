import { Link, useLocation } from 'react-router-dom';
import { BreadcrumbsBox } from './Breadcrumbs.styled';

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split('/').filter(el => el);

  return (
    <BreadcrumbsBox>
      <li>
        {pathnames.length > 0 ? <Link to="/">Home</Link> : <p>Home</p>}
        {pathnames.length > 0 && <span>/</span>}
      </li>

      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <li key={index}>
            <p>{pathname}</p>
          </li>
        ) : (
          <li key={index}>
            <Link to={routeTo}>{pathname}</Link>
            <span>/</span>
          </li>
        );
      })}
    </BreadcrumbsBox>
  );
};

export default Breadcrumbs;
