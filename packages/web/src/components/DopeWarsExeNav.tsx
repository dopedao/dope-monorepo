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
      <AppWindowNavBar showBorder>
        <NavLink href="/inventory">
          <a>Inventory</a>
        </NavLink>
        <NavLink href="/swap-meet">
          <a>Market</a>
        </NavLink>
      </AppWindowNavBar>
    </>
  );
};

export default DopeWarsExeNav;
