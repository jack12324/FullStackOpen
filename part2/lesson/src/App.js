import {useEffect, useState} from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'
import './index.css'
import Notification from './components/Notification'
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";


const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote , setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const LSUSERKEY = 'loggedNoteappUser'

  const loadNotesHook = () => {
    noteService.getAll()
      .then(returnedNotes=> {
        setNotes(returnedNotes)
      })
  }
  const loadUserHook = () => {
    const loggedUserJSON = window.localStorage.getItem(LSUSERKEY)
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }

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

    const handleLogin = async (event) => {
      event.preventDefault()
      try {
        const user = await loginService.login({username, password})
        window.localStorage.setItem(
          LSUSERKEY, JSON.stringify(user)
        )
        noteService.setToken(user.token)
        setUser(user)
        setPassword('')
        setUsername('')
      } catch (exception) {
        showErrorFor(`Wrong Credentials`, 5)
      }
    }

    const showErrorFor = (message, timeInSeconds) => {
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 1000 * timeInSeconds)
    }

    const toggleImportanceOf = (id) => {
        const note = notes.find(note => note.id === id)
        const changedNote = {...note, important: !note.important}

        noteService.update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id === id ? returnedNote: note))
            })
            .catch(() => {
              showErrorFor(`the note '${note.content}' was already deleted from the server`, 5)
              setNotes(notes.filter(note => note.id !== id))
            })
    }
    const logOut = () => {
      window.localStorage.removeItem(LSUSERKEY)
      setUser(null)
      noteService.setToken(null)
    }

    useEffect(loadNotesHook, [])
    useEffect(loadUserHook, [])

    console.log('render', notes.length, 'notes')
    const notesToShow = showAll ? notes : notes.filter(note=>note.important)

    return (
        <div>
          <h1>Notes</h1>
          <Notification message={errorMessage} />
          {user && <p>{user.name} logged in <button onClick={logOut}>log out</button></p>}
          {
            user
            ? <NoteForm note={newNote} setNote={setNewNote} addNoteHandler={addNote}/>
            : <LoginForm password={password} username={username} setUsername={setUsername} setPassword={setPassword} loginHandler={handleLogin}/>
          }
          <label>Show Only Important<input type={'checkbox'} checked={!showAll} onChange={()=>setShowAll(!showAll)}/></label>
          <ul>
            {notesToShow.map(note =>
              <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
            )}
          </ul>
          <Footer/>
        </div>
    )
}

export default App