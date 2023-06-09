import React, { useState } from 'react'
import {Route, Routes, useMatch} from "react-router-dom";
import Notification from "./components/Notification";
import Menu from "./components/Menu";
import AnecdoteList from "./components/AnnecdoteList";
import About from "./components/About";
import Anecdote from "./components/Anecdote";
import Footer from "./components/Footer";
import CreateNew from "./components/CreateNew";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  const match = useMatch('anecdotes/:id')

  const anecdote = match ? anecdotes.find(a => a.id === Number(match.params.id)) : null

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const setNotificationFor = (message, timeInSeconds) => {
    console.log(message)
    setNotification(message)
    setTimeout(() => setNotification(null), 1000 * timeInSeconds)
  }

  const newAnecdoteNotification = (message) => {
    setNotificationFor(`a new anecdote "${message}" has been created!`, 5)
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu/>
      <Notification className={'info'} message={notification}/>
      <Routes>
        <Route path={'/'} element={ <AnecdoteList anecdotes={anecdotes} />}/>
        <Route path={'/about'} element={ <About />}/>
        <Route path={'/create'} element={ <CreateNew addNew={addNew} handleNotification={newAnecdoteNotification}/>}/>
        <Route path={'/anecdotes/:id'} element={<Anecdote anecdote={anecdote}/>}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
