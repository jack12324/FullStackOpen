import {useEffect, useState} from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import './index.css'
import Notification from './components/Notification'
import Footer from "./components/Footer";


const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote , setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const  addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
        }
        noteService.create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })

    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const hook = () => {
        noteService.getAll()
            .then(returnedNotes=> {
                setNotes(returnedNotes)
            })
    }

    const toggleImportanceOf = (id) => {
        const note = notes.find(note => note.id === id)
        const changedNote = {...note, important: !note.important}

        noteService.update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id === id ? returnedNote: note))
            })
            .catch(() => {
                setErrorMessage(
                    `the note '${note.content}' was already deleted from the server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(note => note.id !== id))
            })
    }

    useEffect(hook, [])

    console.log('render', notes.length, 'notes')
    const notesToShow = showAll ? notes : notes.filter(note=>note.important)

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <label>Show Only Important<input type={'checkbox'} checked={!showAll} onChange={()=>setShowAll(!showAll)}/></label>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
                )}
            </ul>
            <form onSubmit={addNote}>
                <input onChange={handleNoteChange} value={newNote}/>
                <button type={"submit"}>save</button>
            </form>
            <Footer/>
        </div>
    )
}

export default App