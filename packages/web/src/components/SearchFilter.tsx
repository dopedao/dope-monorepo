import { ReactNode, Dispatch, SetStateAction, useState, createContext } from 'react';
import {
  SearchOrderField,
} from 'generated/graphql';
import { isTouchDevice } from 'utils/utils';

export type FILTERS = 'All' | 'Has Unclaimed $PAPER' | 'For Sale' | 'Has Unclaimed Gear';

type SearchFilterProps = {
  children: ReactNode;
}

type SearchFilterContextProps = {
  search: [ string, Dispatch<SetStateAction<string>> ];
  order : [ SearchOrderField, Dispatch<SetStateAction<SearchOrderField>> ];
  filter : [ FILTERS, Dispatch<SetStateAction<FILTERS>>];
  view : [ boolean, Dispatch<SetStateAction<boolean>>];
}

const SearchFilterContext = createContext<SearchFilterContextProps>({} as SearchFilterContextProps);

const SearchFilterProvider = ({children}: SearchFilterProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [orderBy, setOrderBy] = useState<SearchOrderField>(SearchOrderField.Greatness);
  const [filterBy, setFilterBy] = useState<FILTERS>('All');
  const [viewCompactCards, setViewCompactCards] = useState(isTouchDevice());

  return (
    <SearchFilterContext.Provider 
      value={{search : [searchValue, setSearchValue],
              order : [orderBy, setOrderBy],
              filter : [filterBy, setFilterBy],
              view : [viewCompactCards, setViewCompactCards]}}
    >
      {children}
    </SearchFilterContext.Provider>
  )
}

export {SearchFilterContext, SearchFilterProvider};