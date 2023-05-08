import {createSlice} from "@reduxjs/toolkit";

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers:{
    createNote(state, action){
      const content = action.payload
      state.push({
        content,
        important: false,
        id: generateId()
      })
    },
    toggleImportanceOf(state, action) {
      console.log(JSON.parse(JSON.stringify(state)))
      return state.map(note => (
        note.id === action.payload
          ? {...note, important: !note.important}
          : note
      ))

    }
  }
})

const generateId = () => {
  return Number((Math.random() * 10000000).toFixed(0))
}

export const {createNote, toggleImportanceOf} = noteSlice.actions
export default noteSlice.reducer