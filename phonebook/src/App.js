import React, { useState, useEffect } from 'react'
import phonebookService from './services/phonebookService'
import Notification from './components/Notification'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState({ message: null, type: '' })

  useEffect(() => {
    phonebookService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const newNotification = ({ message, type, time }) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: '' })
    }, time)
  }

  const addName = event => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const oldPerson = persons.find(person => person.name === newName)
    if (!oldPerson) {
      phonebookService
        .create(newPerson)
        .then(res => {
          setPersons(persons.concat(res))
          setNewName('')
          setNewNumber('')
          newNotification({ message: `Addedd ${newPerson.name}`, type: 'success', time: 3000 })
        })
    }
    else
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        newPerson.id = oldPerson.id
        phonebookService
          .put(newPerson)
          .then(res => {
            setPersons(persons.map(person => person.id === newPerson.id ? newPerson : person))
            setNewName('')
            setNewNumber('')
            newNotification({ message: `Updated ${newPerson.name}`, type: 'success', time: 3000 })
          })
      }

  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterName = event => {
    setFilterName(event.target.value)
  }

  const filterPersons = filterName === ''
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(filterName.toLowerCase())
    )

  const handleDeletePerson = (delPerson) => () => {
    if (window.confirm(`Are you sure you want to delete '${delPerson.name}' from your phonebook?`)) {
      phonebookService
        .remove(delPerson.id)
        .then(res => {
          newNotification({
            message: `Information of ${delPerson.name} has been removed from server`,
            type: 'success',
            time: 5000
          })
        })
        .catch(err => {
          newNotification({
            message: `Information of ${delPerson.name} has already been removed from server`,
            type: 'error',
            time: 5000
          })
        })
        .finally(() => {
          setPersons(persons.filter(person => person.id !== delPerson.id))
        })
    }
  }

  return (
    <div>
      <Notification notification={notification} />
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterName={handleFilterName} />
      <h2>Add new</h2>
      <PersonForm addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Numbers filterPersons={filterPersons} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App