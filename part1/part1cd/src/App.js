import {useState} from 'react'

const Button = ({ handleClick, text }) => (  <button onClick={handleClick}>    {text}  </button>)
const Statistic = ({name, count}) => (<p>{name} {count}</p>)
const Percent = ({name, count}) => (<p>{name} {count} %</p>)

const Statistics = ({good, neutral, bad}) => {
    const total = good+bad+neutral
    return(
        <>
            <Statistic name={'good'} count={good}/>
            <Statistic name={'neutral'} count={neutral}/>
            <Statistic name={'bad'} count={bad}/>
            <Statistic name={'all'} count={total}/>
            <Statistic name={'average'} count={(good-bad)/total}/>
            <Percent name={'positive'} count={(good/total)*100}/>
        </>
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