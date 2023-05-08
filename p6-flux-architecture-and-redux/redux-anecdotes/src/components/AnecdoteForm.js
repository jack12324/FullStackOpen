import {useDispatch} from "react-redux";
import {createAnecdote} from "../reducers/anecdoteReducer";
import {clearNotification, setNotification} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const newAnecdote = (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.anecdote.value))
    dispatch(setNotification(`added anecdote "${event.target.anecdote.value}"`))
    event.target.anecdote.value = ''
    setTimeout(() => dispatch(clearNotification()), 5000)
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