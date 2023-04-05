import {useState} from 'react'

const Button = ({ handleClick, text }) => (  <button onClick={handleClick}>    {text}  </button>)
const StatisticLine = ({name, count}) => (<tr><td>{name}</td><td>{count}</td></tr>)
const Statistics = ({good, neutral, bad}) => {
    const total = good+bad+neutral
    if(total === 0)
        return <p>
            No feedback given
        </p>
    return(
        <table>
            <tbody>
                <StatisticLine name={'good'} count={good}/>
                <StatisticLine name={'neutral'} count={neutral}/>
                <StatisticLine name={'bad'} count={bad}/>
                <StatisticLine name={'all'} count={total}/>
                <StatisticLine name={'average'} count={(good-bad)/total}/>
                <StatisticLine name={'positive'} count={((good/total)*100).toString() + ' %'}/>
            </tbody>
        </table>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <div>
                <Button handleClick={()=>setGood(good + 1)} text={'good'}/>
                <Button handleClick={()=>setNeutral(neutral+ 1)} text={'neutral'}/>
                <Button handleClick={()=>setBad(bad + 1)} text={'bad'}/>
            </div>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App