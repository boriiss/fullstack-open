import ReactDOM from 'react-dom/client'
import App from './App'

import axios from 'axios'



axios.get('https://api.openweathermap.org/data/2.5/weather?lat=55.781001&lon=37.604380&appid=355758e690d095d8efd21adbc7d4d8c8').then(response => {
  
  const test = response.data
  
  console.log('SJ')
})

axios.get('https://restcountries.com/v3.1/all').then(response => {
  
  const notes = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App notes={notes}/>
  )
})
