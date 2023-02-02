import { useEffect, useState } from 'react';
import './Search.css';

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
            <input type="text" placeholder='חפש' onKeyDown={handleKeyDown} value={query} onChange={e => setQuery(e.target.value)}></input>
            <i className="fa-regular fa-magnifying-glass"></i>
        </div>
    )
}

export default SearchBar;