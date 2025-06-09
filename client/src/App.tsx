import { useEffect, useState } from 'react'

interface Player {
  id: number
  name: string
}

function App() {
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/players/search?q=')
      .then(res => res.json())
      .then(data => setPlayers(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h1>Real Madrid Roster</h1>
      <ul>
        {players.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
