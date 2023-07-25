import {useField, useRadio} from "../hooks";
import {NewDiaryEntry, Visibility, Weather} from "../types";
import React, {useState} from "react";
interface NewDiaryFormProps {
    submit:  (diary:NewDiaryEntry) => Promise<string>
}

const NewDiaryForm = (props: NewDiaryFormProps) => {
    const date = useField('date', 'date')
    const visibility = useRadio('visibility', Object.keys(Visibility))
    const weather = useRadio('weather', Object.keys(Weather))
    const comment = useField('comment')
    const [error, setError] = useState('')

    const submitForm = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        setError(await props.submit({date: date.value, visibility: visibility.value, weather: weather.value, comment: comment.value} as NewDiaryEntry))
    }
    return <section>
        <h1>Add new Entry</h1>
        {error ?
            <p>{error}</p>
            :null
        }
        <form onSubmit={submitForm}>
            <label htmlFor={"date"}>date:
                <input {...date.props}/>
            </label>
            {visibility.jsx}
            {weather.jsx}
            <label htmlFor={"comment"}>comment:
                <input {...comment.props}/>
            </label>
            <button type={'submit'}>add</button>
        </form>
    </section>

}
export default NewDiaryForm