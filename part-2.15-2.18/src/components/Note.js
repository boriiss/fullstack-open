const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <div>
      {note.name} <br/>
      number: {note.number} <br/>
      <button onClick={toggleImportance}>{label}</button><br/>
      <button onClick={deleteNote}>delete</button><br/> <br/>
    </div>
  )
}

export default Note