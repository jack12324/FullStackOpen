import {DiaryEntry} from "../types";
import Diary from "./Diary";
import React from "react";

interface DiaryEntriesProps {
    entries: DiaryEntry[]
}

const DiaryEntries = (props: DiaryEntriesProps) => {
    return <section>
        <h1>Diary Entries</h1>
        {props.entries.map((diaryEntry) => (
            <Diary diary={diaryEntry} key={diaryEntry.id}/>
        ))}
    </section>
}
export default DiaryEntries