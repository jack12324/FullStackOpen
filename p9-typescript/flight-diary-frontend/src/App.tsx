import React, {useEffect, useState} from 'react';
import {DiaryEntry, NewDiaryEntry} from "./types";
import {createDiary, getAllDiaries} from "./services/diaryService";
import DiaryEntries from "./components/DiaryEntries";
import NewDiaryForm from "./components/NewDiaryForm";
import axios from "axios";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getAllDiaries().then(res => setDiaryEntries(res))
  }, [])

  const addEntry = async (entry: NewDiaryEntry) : Promise<string>=> {
    try{
      const response = await createDiary(entry)
      setDiaryEntries(diaryEntries.concat(response))
      return ''
    } catch (err) {
      if(axios.isAxiosError(err)){
        if(err.response){
          return err.response.data
        } else {
          return err.message
        }
      }else{
        console.log(err)
        return "unknown error"
      }
    }
  }

  return <>
    <NewDiaryForm submit={addEntry}/>
    <DiaryEntries entries={diaryEntries}/>
    </>
}

export default App;
