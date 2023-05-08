import {useDispatch, useSelector} from "react-redux";
import {incrementVoteFor} from "../reducers/anecdoteReducer";
import {clearNotification, setNotification} from "../reducers/notificationReducer";

const Annecdote = ({anecdote, handleVote}) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )

}

const Anecdotes = () => {
  const anecdotes = useSelector(state => [...state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))].sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(incrementVoteFor(id))
    dispatch(setNotification(`voted for "${anecdotes.find(a => a.id === id).content}"`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  return (
    <section>
      {anecdotes.map(anecdote =>
        <Annecdote key={anecdote.id} anecdote={anecdote} handleVote={() => vote(anecdote.id)}/>
      )}
    </section>
  )
}
export default Anecdotes