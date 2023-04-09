export const Persons = ({persons, handleDelete}) => (
    <section>
        {persons.map(person =>
            <Person key={person.id} person={person} handleDelete={ () => handleDelete(person)}/>
        )}
    </section>
)
const Person = ({person, handleDelete}) => (
    <p>{person.name} {person.number} <button onClick={handleDelete}>delete</button></p>
)