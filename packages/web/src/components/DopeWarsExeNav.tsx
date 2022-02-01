import { NavLink } from 'components/NavLink';
import AppWindowNavBar from 'components/AppWindowNavBar';

const DopeWarsExeNav = () => {
  return (
    <AppWindowNavBar>
      <NavLink href="/swap-meet">
        <a>Swap Meet</a>
      </NavLink>
      <NavLink href="/dope">
        <a>DOPE</a>
      </NavLink>
      <NavLink href="/hustlers">
        <a>Hustlers</a>
      </NavLink>
    </AppWindowNavBar>
  );
};

export default DopeWarsExeNav;
