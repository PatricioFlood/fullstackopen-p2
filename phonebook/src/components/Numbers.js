import React from 'react';

const Numbers = ({filterPersons, handleDeletePerson}) => (
    <div>
        {filterPersons.map(
            person => (
                <p key={person.id}>{person.name} {person.number} <button onClick={handleDeletePerson(person)}>delete</button></p>
            )
        )}
    </div>
)

export default Numbers