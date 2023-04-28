const LoginForm = ({loginHandler, username, password, setUsername, setPassword}) => {
  return (
    <form onSubmit={loginHandler}>
      <label>
        Username
        <input type='text' value={username} name='Username' onChange={({target}) => setUsername(target.value)}/>
      </label>
      <br/>
      <label>
        Password
        <input type='text' value={password} name='Password' onChange={({target}) => setPassword(target.value)}/>
      </label>
      <br/>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm