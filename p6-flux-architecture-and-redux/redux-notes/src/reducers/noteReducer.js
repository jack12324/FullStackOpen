const noteReducer = (state = [], action) => {
  switch(action.type){
    case 'NEW_NOTE':
      return [...state, action.payload]
    case 'TOGGLE_IMPORTANCE':
      return state.map(note => (
        note.id === action.payload.id
          ? {...note, important: !note.important}
          : note
      ))
    default:
      return state
  }
}
const generateId = () => {
  return Number((Math.random() * 10000000).toFixed(0))
}

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = id => ({
  type:'TOGGLE_IMPORTANCE',
  payload: {
    id: id
  }
})

export default noteReducer