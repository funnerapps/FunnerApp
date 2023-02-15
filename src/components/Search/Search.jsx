import { useEffect, useState } from 'react';
import './Search.css';
import SeacrhSvg from '../../search.svg';

const SearchBar = ({ criteria, changeCriteria }) => {
    const [query, setQuery] = useState('')
    useEffect(() => {
        setQuery(criteria["search_term"]);
      }, [criteria]);
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            const newCriteria = {
                ...criteria,
                "page_offset": 0,
                "order_descending": false,
                "filter_by_open": 'all',
                "search_term": query
            }
            changeCriteria(newCriteria);
          }
    }
    return (
        <div className="searchbar">
            <input type="text" placeholder='חיפוש' onKeyDown={handleKeyDown} value={query} onChange={e => setQuery(e.target.value)}></input>
            <img src={SeacrhSvg} alt="search" />
        </div>
    )
}

export default SearchBar;