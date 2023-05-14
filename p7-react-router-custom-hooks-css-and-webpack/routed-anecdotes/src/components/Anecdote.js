const Anecdote = ({anecdote}) => {
  return (
    <section>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see {anecdote.url}</p>
    </section>
  )
}

export default Anecdote