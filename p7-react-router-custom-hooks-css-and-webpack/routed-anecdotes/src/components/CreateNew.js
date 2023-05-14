import {React} from "react";
import {useNavigate} from "react-router-dom";
import {useField} from "../hooks";

const CreateNew = (props) => {
  const content = useField('test')
  const author = useField('text')
  const info   = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.input.value,
      author: author.input.value,
      info: info.input.value,
      votes: 0
    })
    navigate('/')
    props.handleNotification(content.input.value)
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content.input} />
        </div>
        <div>
          author
          <input name='author' {...author.input} />
        </div>
        <div>
          url for more info
          <input name='info' {...info.input} />
        </div>
        <button type={'submit'}>create</button>
        <button type={'button'} onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}
export default CreateNew