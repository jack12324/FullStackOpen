import { useState } from 'react'

const Button = ({ handleClick, text }) => (  <button onClick={handleClick}>    {text}  </button>)

const Anecdote = ({heading, anecdote, votes}) => (
    <>
      <h1>{heading}</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const [selected, setSelected] = useState(0)
  const getRandomSelected = () => {
    const random =Math.floor(Math.random() * anecdotes.length)
    console.log(random)
    setSelected(random)
  }

  const incrementVote = (idx) => () => {
    const new_votes = [...votes]
    new_votes[idx] += 1
    setVotes(new_votes)
  }

  const most_votes = votes.indexOf(Math.max(...votes))

  return (
      <div>
        <Anecdote anecdote={anecdotes[selected]} heading={'Anecdote of the day'} votes={votes[selected]}/>
        <div>
          <Button text={'vote'} handleClick={incrementVote(selected)}/>
          <Button text={'next anecdote'} handleClick={getRandomSelected}/>
        </div>
        <Anecdote anecdote={anecdotes[most_votes]} heading={'Anecdote with most votes'} votes={votes[most_votes]}/>
      </div>
  )
}

export default App