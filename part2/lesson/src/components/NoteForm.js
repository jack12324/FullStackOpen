const LoginForm = ({addNoteHandler, note, setNote}) => {
  return (
    <form onSubmit={addNoteHandler}>
      <input onChange={({target}) => setNote(target.value)} value={note}/>
      <button type={"submit"}>save</button>
    </form>
  )
}

export default LoginForm