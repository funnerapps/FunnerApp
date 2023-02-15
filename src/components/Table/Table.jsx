import InfiniteScroll from 'react-infinite-scroll-component';
import TableItem from '../TableItem/TableItem';
import './Table.css';

const Table = ({ data, criteria, changeCriteria, getRandomColor }) => {
    function onChangeSort(event) {
        debugger;
        let newCriteria;
        if (criteria["order_by"] === event.currentTarget.id) {
            if (criteria["order_descending"]) {
                newCriteria = {
                    ...criteria,
                    "page_offset": 0,
                    "order_descending": false
                }
            } else {
                newCriteria = {
                    ...criteria,
                    "page_offset": 0,
                    "order_descending": true
                }
            }
        } else {
            newCriteria = {
                ...criteria,
                "page_offset": 0,
                "order_by": event.currentTarget.id,
                "order_descending": true
            }
        }
        changeCriteria(newCriteria);
    }
    function getSort() {
        return criteria["order_descending"] === true ? 'desc' : 'asc';
    }
    function fetchMore() {
        const newCriteria = {
            "page_offset": data.length
        }
        changeCriteria(newCriteria);
    }
    return (
        <InfiniteScroll
            dataLength={data.length} //This is important field to render the next data
            next={fetchMore}
            hasMore={true}

        >
            <table width="100%" cellPadding="0">
                <thead>
                    <tr>
                    <th width="55">
                    
                    </th>
                        <th width="134">
                            <div
                                id="phone"
                                className={`th ${criteria["order_by"] === 'phone' ? 'active' : ""} ${criteria["order_by"] === 'phone' ? getSort() : ""}`}
                                onClick={onChangeSort}>
                                מספר ווצאפ
                            </div>
                        </th>
                        <th width="134">
                            <div className='th'>
                                שם ווצאפ
                            </div>
                        </th>
                        <th width="134">
                            <div id="name"
                                className={`th ${criteria["order_by"] === 'name' ? 'active' : ""} ${criteria["order_by"] === 'name' ? getSort() : ""}`}
                                onClick={onChangeSort}>
                                לקוח
                            </div>
                        </th>
                        <th width="134">
                            <div id="name"
                                className={`th ${criteria["order_by"] === 'name' ? 'active' : ""} ${criteria["order_by"] === 'name' ? getSort() : ""}`}
                                onClick={onChangeSort}>
                                איש קשר
                            </div>
                        </th>
                        <th width="134">
                            <div className='th'>
                                משתמש
                            </div>
                        </th>
                        <th width="134">
                            <div id="is_open"
                                className={`th ${criteria["order_by"] === 'is_open' ? 'active' : ""} ${criteria["order_by"] === 'is_open' ? getSort() : ""}`}
                                onClick={onChangeSort}
                            >
                                סטטוס
                            </div>
                        </th>
                        <th width="134">
                            <div
                                id="last_message_date"
                                className={`th ${criteria["order_by"] === 'last_message_date' ? 'active' : ""} ${criteria["order_by"] === 'last_message_date' ? getSort() : ""}`}
                                onClick={onChangeSort}>
                                הודעה אחרונה
                            </div>
                        </th>
                        <th width="50">
                            <div id="last_message_type"
                                className={`th ${criteria["order_by"] === 'last_message_type' ? 'active' : ""} ${criteria["order_by"] === 'last_message_type' ? getSort() : ""}`}
                                onClick={onChangeSort}>
                                סוג
                            </div>
                        </th>
                        <th width="134">
                            <div id="incoming_message_date"
                                className={`th ${criteria["order_by"] === 'incoming_message_date' ? 'active' : ""} ${criteria["order_by"] === 'incoming_message_date' ? getSort() : ""}`}
                                onClick={onChangeSort}>
                                הודעה נכנסת אחרונה
                            </div>
                        </th>
                        <th width="134">
                            <div id="last_message"
                                className={`th ${criteria["order_by"] === 'last_message' ? 'active' : ""} ${criteria["order_by"] === 'last_message' ? getSort() : ""}`}
                                onClick={onChangeSort}>
                                תוכן הודעה אחרונה
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {data.map(item => (
                        <TableItem key={item.Id} data={item} getRandomColor={getRandomColor}/>
                    ))}


                </tbody>
            </table>
        </InfiniteScroll>
    )
}

export default Table;