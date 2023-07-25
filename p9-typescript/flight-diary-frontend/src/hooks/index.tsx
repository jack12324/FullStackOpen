import React, {useState} from "react";

export const useField = (name: string, type?: string) => {
    const [value, setValue] = useState('')
    const props = {
        name: name,
        id: name,
        type: type ? type : "text",
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)
    }
    return {value, props}
}

export const useRadio = (name: string, options: string[], legend?: string ) => {
    const [value, setValue] = useState('')
    const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
    const jsx = <fieldset>
        <legend>{legend ? legend : name}</legend>
        {options.map(o =>
            <label htmlFor={o} key={o}>{o}
                <input type={'radio'} id={o} name={name} value={o.toLowerCase()} onChange={onRadioChange}/>
            </label>
        )}
    </fieldset>

    return{value, jsx}
}