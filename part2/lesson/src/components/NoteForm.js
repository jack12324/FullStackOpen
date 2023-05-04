import { useState } from 'react'

const LoginForm = ({ createNote }) => {

  const [newNote, setNewNote] = useState('')

  const  addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true,
    })
    setNewNote('')
  }

  return (
    <section>
      <h2>Create a new Note</h2>
      <form onSubmit={addNote}>
        <input
          onChange={({ target }) => setNewNote(target.value)}
          value={newNote}
          placeholder={'write note content here'}
        />
        <button type={'submit'}>save</button>
      </form>
    </section>
  )
}

export default LoginForm