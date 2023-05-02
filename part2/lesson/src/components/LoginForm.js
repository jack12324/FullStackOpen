import { useState } from 'react'

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async (event) => {
    event.preventDefault()
    const success = await loginUser({
      username,
      password
    })
    if(success){
      setUsername('')
      setPassword('')
    }
  }


  return (
    <form onSubmit={login}>
      <label>
        Username
        <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)}/>
      </label>
      <br/>
      <label>
        Password
        <input type='text' value={password} name='Password' onChange={({ target }) => setPassword(target.value)}/>
      </label>
      <br/>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm