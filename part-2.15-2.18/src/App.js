import { useState, useEffect } from 'react'

import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [goodMessage, setGoodMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    const searchName = notes.filter(n => n.name == newName)
    event.preventDefault()
    if(!searchName.length) {
      const noteObject = {
        name: newName,
        number: newNumber, 
        important: Math.random() > 0.5,
        id: notes.length + 1,
      }

      noteService
        .create(noteObject)
        .then(returnedNote => {
          setNotes(notes.concat(returnedNote))
          setNewName('')
          setNewNumber('')
          setGoodMessage(
            `Заметка создана`
          )
          setTimeout(() => {
            setGoodMessage(null)
          }, 5000)
        })
    } else {
      const idNote = searchName[0].id
      if (window.confirm("Данное имя существует, хотите заменить телефон?")) {
        const note = notes.find(n => n.id === idNote)
        const changedNote = { ...note, number: newNumber }
      
        noteService
          .update(idNote, changedNote)
          .then(returnedNote => {
            setNotes(notes.map(note => note.id !== idNote ? note : returnedNote))
            setNewName('')
            setNewNumber('')
            setGoodMessage(
              `Номер изменен`
            )
            setTimeout(() => {
              setGoodMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Ошибка`
            )
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }
  }

  const deleteNoteOf = (id) => {
    if (window.confirm("Удалить заметку?")) {
      noteService
        .deleteNote(id)
        .then(returnedNote => {
          noteService
          .getAll()
          .then(initialNotes => {
          setNotes(initialNotes)
        })
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(
          `the note '${note.name}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={goodMessage} error={false}/>
      <Notification message={errorMessage} error={true}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button><br /><br />
      </div>   
      <div>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            deleteNote={() => deleteNoteOf(note.id)}
          />
        )}
      </div>
      <h2>Add a new </h2>
      <form onSubmit={addNote}>
        <input
          value={newName}
          onChange={handleNameChange}
        /><br />
        <input
          value={newNumber}
          onChange={handleNumberChange}
        /><br />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default App