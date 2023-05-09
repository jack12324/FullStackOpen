import {useDispatch, useSelector} from "react-redux";
import {incrementVoteFor} from "../reducers/anecdoteReducer";
import {setNotification} from "../reducers/notificationReducer";

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

  const vote = (anecdote) => {
    dispatch(incrementVoteFor(anecdote))
    dispatch(setNotification(`voted for "${anecdote.content}"`, 5))
  }

  return (
    <section>
      {anecdotes.map(anecdote =>
        <Annecdote key={anecdote.id} anecdote={anecdote} handleVote={() => vote(anecdote)}/>
      )}
    </section>
  )
}
export default Anecdotes