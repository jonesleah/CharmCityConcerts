import ArtistCard from './components/ArtistCard'
import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

// Form to add a new tracked artist
const ArtistForm = ({ addArtist }) => {
  const [name, setName] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const newArtist = await axios.post('/api/add-artist', { name })
      console.log('Name added:', newArtist.data)
      setName('')
      const addConcerts = await axios.post('api/update-concerts', { name } )
      console.log('Concerts added: ', addConcerts.data)
      addArtist(addConcerts.data.artist)
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

// Main App
const App = () => {
  const [artists, setArtists] = useState([])

  useEffect(() => {
    const getArtists = async () => {
      try {
        const response = await axios.get('/api/get-artists')
        setArtists(response.data.artists);
      } catch (err) {
        console.log('Error getting tracked artists concerts:', err)
      }
    };
    getArtists();
  }, []); 

  // 
  const addArtist = (newArtist) => {
    setArtists((prevArtists) => [...prevArtists, newArtist])
  }

  return (
    <div className="App">
      <h1 className="App-title">CharmCityConcerts</h1>
      <ArtistForm addArtist={addArtist} />
      <h2>Tracked Artists:</h2>
      <div className="tracked-artists">
        {artists.map((artist) => (
          <ArtistCard
            key={artist._id}
            artist={artist}
          />
        ))}
      </div>
    </div>
  );
};

export default App;