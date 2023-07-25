import axios from 'axios';
import {NonSensitiveDiaryEntry, NewDiaryEntry} from "../types";

const baseUrl = 'http://localhost:3001/diaries'

export const getAllDiaries = async () => {
    const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl)
    return response.data
}

export const createDiary = async (object: NewDiaryEntry) => {
    const response = await axios.post(baseUrl, object)
    return response.data
}