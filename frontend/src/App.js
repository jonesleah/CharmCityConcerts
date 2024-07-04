import './App.css'
import { useState } from 'react'

const ArtistForm = () => {
  const [name, setName] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
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