import {useEffect, useState} from 'react'
import {Persons} from "./components/Persons";
import {PersonForm} from "./components/PersonForm";
import {Filter} from "./components/Filter";
import phonebookService from "./services/phonebook"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setfilter] = useState('')

  const handleNewName = (event) => {
      setNewName(event.target.value)
  }
  const handleNewNumber= (event) => {
      setNewNumber(event.target.value)
  }
  const updateFilter= (event) => {
      setfilter(event.target.value)
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
                    setNewName('')
                    setNewNumber('')
                }
              )
          }
      } else {
          phonebookService.create({name: newName, number: newNumber}).then(
              responsePerson => setPersons(persons.concat(responsePerson))
          )
          setNewName('')
          setNewNumber('')
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
            <Filter text={'filter shown with'} updateHandler={updateFilter} value={filter}/>
        </section>
        <section>
            <h2>Add a New</h2>
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