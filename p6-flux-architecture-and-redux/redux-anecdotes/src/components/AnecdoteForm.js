import {useDispatch} from "react-redux";
import {createAnecdote} from "../reducers/anecdoteReducer";
import {setNotification} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))
    dispatch(setNotification(`added anecdote "${content}"`, 5))
    event.target.anecdote.value = ''
  }

  return (
    <section>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input name={'anecdote'}/></div>
        <button type={'submit'}>create</button>
      </form>
    </section>
  )
}

export default AnecdoteForm