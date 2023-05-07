import {useDispatch} from "react-redux";
import {createAnecdote} from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const newAnecdote = (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.anecdote.value))
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