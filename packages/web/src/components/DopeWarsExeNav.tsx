import { useContext } from 'react';
import { NavLink } from 'components/NavLink';
import AppWindowNavBar from 'components/AppWindowNavBar';
import { SearchFilterContext } from 'components/SearchFilter';

const DopeWarsExeNav = () => {
  return (
    <>
      <AppWindowNavBar showBorder>
        <NavLink href="/inventory">
          <a>Your Inventory</a>
        </NavLink>
        <NavLink href="/swap-meet">
          <a>DOPE</a>
        </NavLink>
        <NavLink href="/swap-meet/hustlers">
          <a>Hustlers</a>
        </NavLink>
        <NavLink href="/swap-meet/gear">
          <a>Gear</a>
        </NavLink>
        <NavLink href="/swap-meet/turf">
          <a>Turf</a>
        </NavLink>
        <NavLink href="/swap-meet/merch">
          <a>Merch</a>
        </NavLink>
      </AppWindowNavBar>
    </>
  );
};

export default DopeWarsExeNav;
