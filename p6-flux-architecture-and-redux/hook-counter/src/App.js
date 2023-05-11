import {useCounterDispatch, useCounterValue} from "./CounterContext";

const Button = ({type, label}) => {
  const counterDispatch = useCounterDispatch()
  return (
    <button onClick={() => counterDispatch({type})}>
      {label}
    </button>
  )
}

const Display = () => {
  const counter = useCounterValue()
  return <div>{counter}</div>
}

const App = () => {

  return (
    <div>
      <Display />
      <div>
        <Button type="INC" label='+'/>
        <Button type="DEC" label='-'/>
        <Button type="ZERO" label='0'/>
      </div>
    </div>
  )
}

export default App