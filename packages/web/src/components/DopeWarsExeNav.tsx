import { useContext } from 'react';
import { NavLink } from 'components/NavLink';
import AppWindowNavBar from 'components/AppWindowNavBar';
import { SearchFilterContext } from 'components/SearchFilter';
import MarketFilterBar from 'features/swap-meet/components/MarketFilterBar';

const DopeWarsExeNav = ({ hideFilterBar = false }: { hideFilterBar?: boolean }) => {
  const { search, order, filter, view } = useContext(SearchFilterContext);

  const [searchValue, setSearchValue] = search;
  const [orderBy, setOrderBy] = order;
  const [filterBy, setFilterBy] = filter;
  const [viewCompactCards, setViewCompactCards] = view;

  return (
    <>
      {!hideFilterBar && (
        <MarketFilterBar
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          setViewCompactCards={setViewCompactCards}
          compactSwitchOn={viewCompactCards}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          setSearchValue={setSearchValue}
        />
      )}
      <AppWindowNavBar showBorder>
        <NavLink href="/inventory">
          <a>Your Inventory</a>
        </NavLink>
        <NavLink href="/swap-meet">
          <a>DOPE</a>
        </NavLink>
        <NavLink href="/swap-meet-hustlers">
          <a>Hustlers</a>
        </NavLink>
        <NavLink href="/swap-meet-gear">
          <a>Gear</a>
        </NavLink>
      </AppWindowNavBar>
    </>
  );
};

export default DopeWarsExeNav;
