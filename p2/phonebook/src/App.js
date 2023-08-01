import {useEffect, useState} from 'react'
import {Persons} from "./components/Persons";
import {PersonForm} from "./components/PersonForm";
import {Filter} from "./components/Filter";
import phonebookService from "./services/phonebook"
import Notification from "./components/Notification";
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setfilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleNewName = (event) => {
      setNewName(event.target.value)
  }
  const handleNewNumber= (event) => {
      setNewNumber(event.target.value)
  }
  const updateFilter= (event) => {
      setfilter(event.target.value)
  }
  const displayNotificationFor = (message, seconds, setNotification) => {
      setNotification(message)
      setTimeout( () => {
              setNotification(null)
          }, 1000 * seconds
      )
  }

  const handleSubmit= (event) => {
      event.preventDefault()
      if (persons.some(person => person.name === newName)){
          if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
              const person = persons.find(person => person.name === newName)
              const updatedPerson = {...person, number: newNumber}
              phonebookService.update(updatedPerson.id, updatedPerson).then(
                responsePerson => {
                    setPersons(persons.map(person => person.id === responsePerson.id ? responsePerson : person))
                    displayNotificationFor(`Updated Number for ${responsePerson.name}`, 5, setSuccessMessage)
                    setNewName('')
                    setNewNumber('')
                }
              ).catch(
                  error => {
                      if(error.response) {
                          console.log(error)
                          displayNotificationFor(error.response.data.error, 5, setErrorMessage)
                      } else {
                          displayNotificationFor(`Update unsuccessful: ${person.name} has already been removed from server`, 5, setErrorMessage)
                          setPersons(persons.filter(p => p.id !== person.id))
                      }
                  }
              )
          }
      } else {
          phonebookService.create({name: newName, number: newNumber})
              .then(
                responsePerson => {
                    setPersons(persons.concat(responsePerson))
                    displayNotificationFor(`Added ${responsePerson.name}`, 3, setSuccessMessage)
                    setNewName('')
                    setNewNumber('')
                })
              .catch(
                  error => {
                      console.log(error)
                      displayNotificationFor(error.response.data.error, 5, setErrorMessage)
                  }
              )
      }
  }

  const handleDelete = (person) => {
      if (window.confirm(`Delete ${person.name}`)){
          phonebookService.deletePerson(person.id).then( () =>
              setPersons(persons.filter(p => p.id !== person.id))
          )
      }
  }

  const hook = () =>{
      phonebookService.getAll()
      .then(
          responsePersons => {
              setPersons(responsePersons)
          }
      )
  }
  useEffect(hook, [])


  const peopleToShow = persons.filter(
      person => person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
        <section>
            <h2>Phonebook</h2>
            <Notification className={'error'} message={errorMessage}/>
            <Notification className={'success'} message={successMessage}/>
            <Filter text={'search'} updateHandler={updateFilter} value={filter}/>
        </section>
        <section>
            <h2>Add a New Person</h2>
            <PersonForm
                submitHandler={handleSubmit}
                nameHandler={handleNewName} nameVal={newName}
                numberHandler={handleNewNumber} numberVal={newNumber}
            />
        </section>
        <section>
            <h2>Numbers</h2>
            <Persons persons={peopleToShow} handleDelete={handleDelete}/>
        </section>
    </div>
  )
}

export default App