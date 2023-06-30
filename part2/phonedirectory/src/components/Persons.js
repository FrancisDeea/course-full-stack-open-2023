import Button from './Button'

const Persons = ({ persons, onclick }) => (
    <>
        {
            persons.map(person => {
                return (
                    <div key={person.name}>
                        <span>{person.name} {person.number}</span>
                        {" "}
                        <Button value="delete" onclick={onclick} id={person.id} />
                    </div>
                )
            })
        }
    </>
)

export default Persons;