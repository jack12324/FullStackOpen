export const PersonForm = ({submitHandler, nameVal, nameHandler, numberVal, numberHandler}) => (
    <form onSubmit={submitHandler}>
        <label>
            name: <input onChange={nameHandler} value={nameVal}/>
        </label>
        <br/>
        <label>
            number: <input onChange={numberHandler} value={numberVal}/>
        </label>
        <br/>
        <button type="submit">add</button>
    </form>
)