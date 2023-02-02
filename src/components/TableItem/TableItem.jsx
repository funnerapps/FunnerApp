const TableItem = ({ data }) => {
    function formatDate(dateString) {
        let newDate = '';
        if(dateString){
            let date = new Date(dateString)
            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1; // Months start at 0!
            let dd = date.getDate();
            let hour = date.getHours();
            let minutes = date.getMinutes()
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            if (hour < 10) hour = '0' + hour;
            if (minutes < 10) minutes = '0' + minutes;
            newDate = `${dd}/${mm}/${yyyy} ${hour}:${minutes}`
        } else{
            newDate = 'ללא';
        }
        return newDate;
    }
    return (
        <tr className="row">
            <td>
                <div className="td">
                    <a href="#">{data.UserDisplayPhoneNumber}</a>
                </div>
            </td>
            <td>
                <div className="td">
                    <a href="#">{data.FullName}</a>
                </div>
            </td>
            <td>
                <div className="td">
                    <a href="#">{data.FullName}</a>
                </div>
            </td>
            <td>
                <div className="td">
                    {data.LastMessageType === 'outcoming' ? data.OutcomingLastMessage : data.IncomingLastMessage}
                </div>
            </td>
            <td>
                <div className="td">
                    {data.LastMessageType}
                </div>
            </td>
            <td>
                <div className="td">
                    {data.LastMessageType === 'outcoming' ? formatDate(data.OutcomingLastMessageDate) : formatDate(data.IncomingLastMessageDate)}
                </div>
            </td>
            <td>
                <div className="td">
                    {formatDate(data.IncomingLastMessageDate)}
                </div>
            </td>
            <td>
                <div className="td">
                    {data.IsOpen === true ? 'פתוחה' : 'סגורה'}
                </div>
            </td>
        </tr>
    )
}

export default TableItem;