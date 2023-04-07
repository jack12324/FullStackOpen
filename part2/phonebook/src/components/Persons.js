export const Persons = ({persons}) => (
    <section>
        {persons.map(person =>
            <Person key={person.name} person={person}/>
        )}
    </section>
)
const Person = ({person}) => (
    <p>{person.name} {person.number}</p>
)