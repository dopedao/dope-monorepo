import { useContext } from 'react';
import { NavLink } from 'components/NavLink';
import AppWindowNavBar from 'components/AppWindowNavBar';
import { SearchFilterContext } from 'components/SearchFilter';
import MarketFilterBar from 'features/swap-meet/components/MarketFilterBar';

const DopeWarsExeNav = () => {
  const { search, order, filter, view } = useContext(SearchFilterContext);

  const [searchValue, setSearchValue] = search;
  const [orderBy, setOrderBy] = order;
  const [filterBy, setFilterBy] = filter;
  const [viewCompactCards, setViewCompactCards] = view;

  return (
    <>
      <MarketFilterBar
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        setViewCompactCards={setViewCompactCards}
        compactSwitchOn={viewCompactCards}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        setSearchValue={setSearchValue}
      />
      <AppWindowNavBar>
        <NavLink href="/profile">
          <a>Profile</a>
        </NavLink>
        <NavLink href="/swap-meet">
          <a>Market</a>
        </NavLink>
        <NavLink href="/dope">
          <a>Gear</a>
        </NavLink>
        <NavLink href="/hustlers">
          <a>Hustlers</a>
        </NavLink>
      </AppWindowNavBar>
    </>

  );
};

export default DopeWarsExeNav;
