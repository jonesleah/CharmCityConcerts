const ArtistCard = ({ artist }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          {artist.name}
        </h5>
      </div>
      <ul className="concert-list">
        {artist.concerts.map(concert => (
          <li key={concert.id} className="concert-item">
            {concert.date} - {concert.venue} - ${concert.ticketPrice}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ArtistCard