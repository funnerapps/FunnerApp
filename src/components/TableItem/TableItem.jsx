import Avatar from '../../avatar.svg';
import ArrowUp from '../../arrow-up.svg';
import ArrowDown from '../../arrow-down.svg';

const TableItem = ({ data, getRandomColor }) => {
    function formatDate(dateString) {
        let newDate = '';
        if (dateString) {
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
        } else {
            newDate = 'ללא';
        }
        return newDate;
    }

    function openChatPopup(phone, name) {
        console.log(phone, name);
        window.parent.postMessage({ type: 'FunnerOpenPopup', phone, name }, '*')
    }

    const color = getRandomColor("שוקי פורטל");

    return (
        <tr className="row">
            <td>
                <div className="td">
                    <img src={Avatar} alt="Avatar" />
                </div>
            </td>
            <td>
                <div className="td">
                    <div className="blue" onClick={() => openChatPopup(data.UserDisplayPhoneNumber, '')}>{data.UserDisplayPhoneNumber}</div>
                </div>
            </td>
            <td>
                <div className="td">
                    שוקי פורטל
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
                <div className="td flex align-items-center">
                <div className="user" style={{
                        backgroundColor: color.color,
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        marginLeft: '5px'
                    }}>{color.character}</div>
                    משתמש
                </div>
            </td>
            <td>
                <div className="td">
                    <select value={data.IsOpen}>
                        <option value="true">פתוחה</option>
                        <option value="false">סגורה</option>
                    </select>
                </div>
            </td>
            <td>
                <div className="td">
                    {data.LastMessageType === 'outcoming' ? formatDate(data.OutcomingLastMessageDate) : formatDate(data.IncomingLastMessageDate)}
                </div>
            </td>
            <td>
                <div className="td">
                    {data.LastMessageType === 'outcoming' && <img src={ArrowUp} alt="outcoming" />}
                    {data.LastMessageType === 'incoming' && <img src={ArrowDown} alt="imcoming" />}
                </div>
            </td>
            <td>
                <div className="td">
                    {formatDate(data.IncomingLastMessageDate)}
                </div>
            </td>
            <td>
                <div className="td">
                    {data.LastMessageType === 'outcoming' ? data.OutcomingLastMessage : data.IncomingLastMessage}
                </div>
            </td>
        </tr>
    )
}

export default TableItem;