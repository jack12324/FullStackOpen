import diaries from "../../data/diaries";
import {DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry} from "../types";

const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const findById = (id: number): DiaryEntry | undefined => {
    return diaries.find(d => d.id === id);
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map((d) => ({
        id: d.id,
        date: d.date,
        weather: d.weather,
        visibility: d.visibility
    }));
};

const addDiary = (entry: NewDiaryEntry):DiaryEntry => {
    const newDiaryEntry = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...entry
    };
    diaries.push(newDiaryEntry);
    return newDiaryEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    findById,
    addDiary
};