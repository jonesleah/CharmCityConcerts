import './App.css'
import { useState } from 'react'
import axios from 'axios'

const ArtistForm = () => {
  const [name, setName] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await axios.post('/api/add-artist', { name })
      console.log('Name added:', response.data)
      setSuccessMessage('Artist added successfully!')
      setName('')
    }
    catch (err) {
      console.log(err)
      setSuccessMessage('Failed to add artist. Check to ensure correct spelling.')

    }
  }

  return (
    <div className="App-form">
      <h2>
        Add a new tracked artist:
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Artist name:
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{marginLeft: '10px', marginRight: '10px'}}
          />
        </label>
        <input type='submit' value='Enter' />
      </form>
    </div>
  )
}

const App = () => {
  return (
    <div className="App">
      <h1 className="App-title">CharmCityConcerts</h1>
      <ArtistForm />
    </div>

  );
}

export default App