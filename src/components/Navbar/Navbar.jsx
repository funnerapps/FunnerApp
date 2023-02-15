import './Navbar.css';

const Navbar = ({criteria,changeCriteria}) => {
    function onChangeType(event) {
        if (event.currentTarget.classList.contains('active')) return;
        if(event.currentTarget.classList.contains('display-all')) {
            changeCriteria({
                ["page_offset"]: 0,
                ['filter_by_open']: "all",
                ['order_by']: 'last_message_date',
                ['order_descending']: true,
                ["search_term"]: ''
              })
        }
        if(event.currentTarget.classList.contains('display-closed')) {
            changeCriteria({
                ["page_offset"]: 0,
                ['filter_by_open']: "closed",
                ['order_by']: 'last_message_date',
                ['order_descending']: true,
                ["search_term"]: ''
              })
        }
        if(event.currentTarget.classList.contains('display-open')) {
            changeCriteria({
                ["page_offset"]: 0,
                ['filter_by_open']: "open",
                ['order_by']: 'last_message_date',
                ['order_descending']: true,
                ["search_term"]: ''
              })
        }
    }

    return (
        <div className="sidebar">
            <div className={`display display-all ${criteria["filter_by_open"] === 'all' ? 'active' : ''}`} onClick={onChangeType}>
                הכל
            </div>
            <div className={`display display-open ${criteria["filter_by_open"] === 'open' ? 'active' : ''}`} onClick={onChangeType}>
                פתוחות
            </div>
            <div className={`display display-closed ${criteria["filter_by_open"] === 'closed' ? 'active' : ''}`} onClick={onChangeType}>
                סגורות
            </div>
        </div>
    )
}

export default Navbar;