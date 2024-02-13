import { NavLink } from 'components/NavLink';
import AppWindowNavBar from 'components/AppWindowNavBar';

const DopeWarsExeNav = () => {
  return (
    <>
      <AppWindowNavBar showBorder>
        <NavLink href="/swap-meet/inventory">
          <>👉 Your Stuff 👈</>
        </NavLink>
        <NavLink href="/swap-meet">
          <>DOPE</>
        </NavLink>
        <NavLink href="/swap-meet/hustlers">
          <>Hustlers</>
        </NavLink>
        <NavLink href="/swap-meet/gear">
          <>Gear</>
        </NavLink>
      </AppWindowNavBar>
    </>
  );
};

export default DopeWarsExeNav;
