import './Select.css';

const Select = ({ values, onChange }) => {
    return (
        <select className='select' onChange={onChange}>
            {values.map(value => <option key={value.value} value={value.value}>{value.text}</option>)}
        </select>
    )
}

export default Select;