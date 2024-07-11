import ArtistCard from './components/ArtistCard'
import './App.css'
import { useState } from 'react'
import axios from 'axios'

const ArtistForm = () => {
  const [name, setName] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await axios.post('/api/add-artist', { name })
      console.log('Name added:', response.data)
      setName('')
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="form">
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
            style={{ marginLeft: '10px', marginRight: '10px' }}
          />
        </label>
        <input type='submit' value='Enter' />
      </form>
    </div>
  )
}

const App = () => {
  const [artists, setArtists] = useState([])

  useEffect(() => {
    const getArtists = async () => {
      try {
        const response = await axios.get('/api/get-artists')
      }
      catch (err) {
        console.log('Error getting tracked artists concerts:', err)
      }
    }
  })
  return (
    <div className="App">
      <h1 className="App-title">CharmCityConcerts</h1>
      <ArtistForm />
      <div className="tracked-artists">
        <h2>Tracked Artists:</h2>
        {artists.map (artist => (
          <ArtistCard key={artist._id} artist={artist.name} />
        ))}
      </div>
    </div>

  );
}

export default App