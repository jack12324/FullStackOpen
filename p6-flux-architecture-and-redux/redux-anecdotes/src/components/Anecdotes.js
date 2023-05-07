import {useDispatch, useSelector} from "react-redux";
import {incrementVoteFor} from "../reducers/anecdoteReducer";

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
  const anecdotes = useSelector(state => [...state].sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(incrementVoteFor(id))
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