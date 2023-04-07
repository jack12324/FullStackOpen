import {useState} from 'react'
import {Persons} from "./components/Persons";
import {PersonForm} from "./components/PersonForm";
import {Filter} from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-456-7890'}
  ])
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
          alert(`${newName} is already added to phonebook`)
          return
      }
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
  }

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
            <Persons persons={peopleToShow}/>
        </section>
    </div>
  )
}

export default App