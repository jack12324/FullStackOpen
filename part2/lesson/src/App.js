import { useEffect, useRef, useState } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'
import './index.css'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'


const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  const LSUSERKEY = 'loggedNoteappUser'

  const loadNotesHook = () => {
    noteService.getAll()
      .then(returnedNotes => {
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

  const  addNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility()
    const returnedNote = await noteService.create(noteObject)
    setNotes(notes.concat(returnedNote))
  }

  const loginUser = async userIn => {
    try {
      const user = await loginService.login(userIn)
      window.localStorage.setItem(
        LSUSERKEY, JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      return true
    } catch (exception) {
      showErrorFor('Wrong Credentials', 5)
      return false
    }
  }

  const showErrorFor = (message, timeInSeconds) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 1000 * timeInSeconds)
  }

  const toggleImportanceOf = async (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }

    try {
      const returnedNote = await noteService.update(id, changedNote)
      setNotes(notes.map(note => note.id === id ? returnedNote : note))
    } catch(error) {
      showErrorFor(`the note '${note.content}' was already deleted from the server`, 5)
      setNotes(notes.filter(note => note.id !== id))
    }
  }
  const logOut = () => {
    window.localStorage.removeItem(LSUSERKEY)
    setUser(null)
    noteService.setToken(null)
  }

  useEffect(loadNotesHook, [])
  useEffect(loadUserHook, [])

  console.log('render', notes.length, 'notes')
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user && <p>{user.name} logged in <button onClick={logOut}>log out</button></p>}
      {
        user
          ? <Togglable key='create-note-toggle' buttonLabel={'new note'} ref={noteFormRef}>
            <NoteForm createNote={addNote}/>
          </Togglable>
          :  <Togglable key='login-toggle' buttonLabel='login'>
            <LoginForm loginUser={loginUser}/>
          </Togglable>
      }
      <label>Show Only Important<input type={'checkbox'} checked={!showAll} onChange={() => setShowAll(!showAll)}/></label>
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