export const Filter = ({text, updateHandler, value}) => (
    <label>{text} <input onChange={updateHandler} value={value}/></label>
)