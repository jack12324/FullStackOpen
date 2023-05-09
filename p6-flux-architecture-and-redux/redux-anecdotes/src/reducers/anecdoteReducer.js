import {createSlice} from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    replaceAnecdote(state, action) {
      return state.map(anecdote => (
        anecdote.id === action.payload.id
          ? action.payload
          : anecdote
      ))
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const {appendAnecdote,  setAnecdotes, replaceAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const incrementVoteFor = (anecdote) => {
  return async dispatch => {
    const anecdoteToChange = {...anecdote, votes: anecdote.votes + 1}
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdoteToChange)
    dispatch(replaceAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer