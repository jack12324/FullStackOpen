import {DiaryEntry} from "../types";

interface DiaryProps{
    diary: DiaryEntry
}

const Diary = (props:DiaryProps) => {
    return <>
        <h3>{props.diary.date}</h3>
        <p>{`visibility: ${props.diary.visibility}`}<br/>{`weather: ${props.diary.weather}`}</p>
    </>

}

export default Diary