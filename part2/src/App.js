import { useState, useEffect } from 'react'
import axios from 'axios'

// https://api.openweathermap.org/geo/1.0/direct?q=Tórshavn,,FRO&appid=355758e690d095d8efd21adbc7d4d8c8



axios.get('https://api.openweathermap.org/geo/1.0/direct?q=Tórshavn,,FRO&appid=355758e690d095d8efd21adbc7d4d8c8').then(response => {
  
  const test = response.data
  
})

const api_key = process.env.REACT_APP_API_KEY



const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [searchValue, setSearchValue] = useState('')
  const [search, setSearch] = useState(false)
  const [showId, setShowId] = useState('')
  const [temperature, setTemperature] = useState('')
  const [wind, setWind] = useState('')

  const handleNoteChange = (event) => {
    setSearchValue(event.target.value)
    setSearch(true)
    setShowId('');
  }

  const showInfo = (index) => {
    setShowId(index);
  }

  const showDetailCountry = (props) => {
    return (
      <>
        <h2>{props.name.common}</h2>
        <div>capital  {props.capital}</div>
        <div>area  {props.area}</div>
        <div>languages:</div>
        <ul>
          {Object.keys(props.languages).map(key => <li key={key}>{props.languages[key]}</li>)}
        </ul>
        <img src={props.flags.png} alt="" />
        <div>Weather in {props.capital}</div>
        {Weather(props.capital)}
      </>
    );
  }

  const showCountry = (note, index) => {
    if (showId === index) {
      return (
        <li key={index}>{note.name.common} <button onClick={() => showInfo(index)}>show</button>
          {showDetailCountry(note)}
        </li>
      )
    } else {
      return (
        <li key={index}>{note.name.common} <button onClick={() => showInfo(index)}>show</button></li>
      )
    }
  }

  const Weather = (capital) => {
    
    axios.get("https://api.openweathermap.org/geo/1.0/direct?q=" + capital + ",,FRO&appid=" + api_key).then(response => {
      
      axios.get("https://api.openweathermap.org/data/2.5/weather?lat=" + response.data[0].lat + "&lon=" + response.data[0].lon + "&appid=" + api_key).then(response => {
        setTemperature(response.data.main.temp)
        setWind(response.data.wind.speed)
      })
    })
    return(
      <>
        <div>Temperature {temperature} Celcius</div>
        <div>wind {wind} m/s</div>
      </>
    )
  }



  let notesToShow = '';

  if(search){
    let result = notes.filter(function(el) {
      return el.name.common.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
    })
    
    if (result.length === 1) {
      notesToShow = showDetailCountry(result[0]);
    } else if(result.length === 0){
      notesToShow = 'Ничего не найдено';
    } else if (result.length < 10) {
      notesToShow = result.map((note, index) =>
      showCountry(note, index)
      );
    } else {
      notesToShow = 'Уточните поиск';
    }
  }

  return (
    <div>
      <h1>Notes</h1>
        find countries <input
          onChange={handleNoteChange}
        />
        <div>
          {notesToShow}
        </div>
    </div>
  )
}

export default App