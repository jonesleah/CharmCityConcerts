import { useState, useRef, useEffect } from 'react'

// Functional component to display the artist's concerts
const ArtistCard = ({ artist }) => {
  const [visible, setVisible] = useState(false)
  const cardRef = useRef(null)

  // closes the concert list if the user clicks outside of it
  const handleClick = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setVisible(false)
    }
  }

  // adds/removes handleClick as an eventListener 
  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  const toggleConcertList = () => {
    setVisible(!visible)
  }

  return (
    <div className="card" ref={cardRef}>
      <div className="card-body" onClick={toggleConcertList}>
        <h5 className="card-title">
          {artist.name}
        </h5>
      </div>
      {visible && (
        <ul className="concert-list">
          {artist.concerts.map((concert, index) => (
            <li key={index} className="concert-item">
              {concert.month} {concert.day} - {concert.venue} - {concert.location}
            </li>
          ))}
        </ul>
        )}
    </div>
  )
}

export default ArtistCard