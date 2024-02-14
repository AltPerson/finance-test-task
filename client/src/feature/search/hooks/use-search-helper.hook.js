import { useDispatch, useSelector } from 'react-redux';
import { selectSearchQuery, setQuery } from '../../../store/reducers/search/search-slice';

export const useSearchHelperHook = () => {
  const dispatch = useDispatch();
  const query = useSelector(selectSearchQuery);
  const handleSearchQueryChange = (e) => dispatch(setQuery(e.target.value));

  return { query, handleSearchQueryChange };
};
