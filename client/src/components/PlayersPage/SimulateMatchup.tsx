import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';     
import './SimulateMatchup.css';

type Player = {
  name: string;
  height: string;
  weight: string;
  threePoint: string;
  fieldGoal: string;
  defense: string;
  position: string;
};

const defaultPlayers: Player[] = [
  {
    name: "Michael Jordan",
    height: '6-6',
    weight: '216 lbs',
    threePoint: '42.7%',
    fieldGoal: '49.5%',
    defense: 'NBA All-Defensive First Team, 2 steals per game',
    position: 'Shooting Guard',
  },
  {
    name: "Lebron James",
    height: '6-9',
    weight: '250 lbs',
    threePoint: '40.6%',
    fieldGoal: '56.5%',
    defense: 'NBA All-Defensive First Team, 1.7 steals per game',
    position: 'Small Forward',
  },
  {
    name: "Kobe Bryant",
    height: '6-6',
    weight: '212 lbs',
    threePoint: '38.3%',
    fieldGoal: '45.1%',
    defense: 'NBA All-Defensive First Team, 2.2 steals per game',
    position: 'Shooting Guard',
  },
  {
    name: "Larry Bird",
    height: '6-9',
    weight: '220 lbs',
    threePoint: '42.7%',
    fieldGoal: '52.2%',
    defense: 'NBA All-Defensive Second Team, 1.6 steals per game',
    position: 'Small Forward / Power Forward',
  },
  {
    name: "Magic Johnson",
    height: '6-9',
    weight: '215 lbs',
    threePoint: '20.5%',
    fieldGoal: '52.2%',
    defense: 'NBA All-Defensive Second Team votes, 1.6 steals per game',
    position: 'Point Guard',
  },
  {
    name: "Shaquille O'Neal",
    height: '7-1',
    weight: '325 lbs',
    threePoint: '0.0%', // Probably the same as his free throw percentage ( Boom roasted )
    fieldGoal: '57.4%',
    defense: 'NBA All-Defensive Second Team, 3 blocks per game',
    position: 'Center',
  },
  {
    name: "Stephen Curry",
    height: '6-2',
    weight: '185 lbs',
    threePoint: '45.4%',
    fieldGoal: '50.4%',
    defense: '1.8 steals per game, solid team defender',
    position: 'Point Guard',
  },
  {
    name: "Kevin Durant",
    height: '6-10',
    weight: '240 lbs',
    threePoint: '37.5%',
    fieldGoal: '53.7%',
    defense: '1.6 blocks per game, strong rim protector for his position',
    position: 'Small Forward / Power Forward',
  },
  {
    name: "Tim Duncan",
    height: '6-11',
    weight: '250 lbs',
    threePoint: '0.0%',
    fieldGoal: '51.3%',
    defense: 'NBA All-Defensive First Team, 2.9 blocks per game',
    position: 'Power Forward / Center',
  },
  {
    name: "Hakeem Olajuwon",
    height: '7-0',
    weight: '255 lbs',
    threePoint: '0.0%',
    fieldGoal: '52.8%',
    defense: 'Defensive Player of the Year, 3.7 blocks per game',
    position: 'Center',
  },
  {
    name: "Dirk Nowitzki",
    height: '7-0',
    weight: '245 lbs',
    threePoint: '39.3%',
    fieldGoal: '51.7%',
    defense: 'Solid team defender, 0.6 blocks per game',
    position: 'Power Forward',
  },
  {
    name: "Giannis Antetokounmpo",
    height: '6-11',
    weight: '242 lbs',
    threePoint: '30.3%',
    fieldGoal: '56.9%',
    defense: 'NBA All-Defensive First Team, 1.2 blocks and 1.2 steals per game',
    position: 'Power Forward',
  },
  {
    name: "Wilt Chamberlain",
    height: '7-1',
    weight: '275 lbs',
    threePoint: 'N/A', // (no 3-point line in his era)
    fieldGoal: '68.3%',
    defense: 'Elite shot blocker and rebounder (unofficial stats)',
    position: 'Center',
  },
  {
    name: "Bill Russell",
    height: '6-10',
    weight: '215 lbs',
    threePoint: 'N/A', // (no 3-point line in his era)
    fieldGoal: '45.7%',
    defense: '11x Champion, greatest defender ever (5 blocks per game estimated)',
    position: 'Center',
  },
  {
    name: "Anthony Edwards",
    height: '6-4',
    weight: '225 lbs',
    threePoint: '35.7%',
    fieldGoal: '46.1%',
    defense: 'Strong perimeter defender, 1.3 steals per game',
    position: 'Shooting Guard / Small Forward',
  },
  {
    name: "Luka Doncic",
    height: '6-7',
    weight: '230 lbs',
    threePoint: '38.2%',
    fieldGoal: '48.7%',
    defense: 'Solid post defender for guard, 1.4 steals per game',
    position: 'Point Guard / Shooting Guard',
  },
  {
    name: "Tyrese Haliburton",
    height: '6-5',
    weight: '185 lbs',
    threePoint: '36.4%',
    fieldGoal: '47.7%',
    defense: 'Good team defender, 1.2 steals per game',
    position: 'Point Guard',
  }
];

const SimulateMatchup = () => {
  const [defaultPlayersState] = useState<Player[]>(defaultPlayers); // Default players are immutable
  const [userPlayers, setUserPlayers] = useState<Player[]>([]); // Separate state for user-created players, update/delete
  const [player1Name, setPlayer1Name] = useState(defaultPlayers[0].name);
  const [player2Name, setPlayer2Name] = useState(defaultPlayers[1].name);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
// User created player section useState starting point
  const [newPlayer, setNewPlayer] = useState<Player>({
    name: '',
    height: '',
    weight: '',
    threePoint: '',
    fieldGoal: '',
    defense: '',
    position: ''
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
// Player selection
  const simulateGame = async () => {
    setLoading(true);
    const allPlayers = [...defaultPlayersState, ...userPlayers];
    const player1 = allPlayers.find(p => p.name === player1Name);
    const player2 = allPlayers.find(p => p.name === player2Name);

    if (!player1 || !player2) {
      setResult('Invalid player selection.');
      setLoading(false);
      return;
    }
    
    try {
      const apiurl = import.meta.env.VITE_API_URL
      console.log(`${apiurl}/api/simulate`, 'react api test');
      const response = await axios.post(`${apiurl}/api/simulate`, {
        
        player1,
        player2,
      });
      
      setResult(response.data.result);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Simulation failed:', error);
      setResult('Something went wrong...');
    } finally {
      setLoading(false);
    }
  };
// handling new player
  const handleNewPlayerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPlayer({ ...newPlayer, [e.target.name]: e.target.value });
  };

  const addOrUpdatePlayer = () => {
    if (!newPlayer.name) return;

    if (editingIndex !== null) {
      const updatedPlayers = [...userPlayers];
      updatedPlayers[editingIndex] = newPlayer;
      setUserPlayers(updatedPlayers);
      setEditingIndex(null);
    } else {
      setUserPlayers([...userPlayers, newPlayer]);
    }
// once upated, reseting new stats for next created player
    setNewPlayer({
      name: '',
      height: '',
      weight: '',
      threePoint: '',
      fieldGoal: '',
      defense: '',
      position: ''
    });
  };

  const handleEditPlayer = (index: number) => {
    const playerToEdit = userPlayers[index];
    setNewPlayer(playerToEdit);
    setEditingIndex(index);
  };

  const handleDeletePlayer = (index: number) => {
    const updatedPlayers = userPlayers.filter((_, i) => i !== index);
    setUserPlayers(updatedPlayers);
  };

  return (
    <div className="simulate-wrapper">
  <div className="main-login-wrapper simulator p-4">

      <h2 className="text-xl font-bold mb-2">Choose Matchup</h2>
      <div className="flex flex-col gap-4 mb-4"> 
        <label>
          Player 1:
          <select 
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            className="ml-2 p-2 border rounded"
            required
          >
            {[...defaultPlayersState, ...userPlayers]
              .filter(p => p.name !== player2Name)
              .map(p => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
          </select>
        </label>

        <span className="vs-text">VS</span>

        <label>
          Player 2:
          <select 
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            className="ml-2 p-2 border rounded"
            required
          >
            {[...defaultPlayersState, ...userPlayers].map(p => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
        </label>
      </div>

      <button
        onClick={simulateGame}
        className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"

        disabled={loading}
      >
        {loading ? "Simulating..." : `Simulate ${player1Name} vs ${player2Name}`}
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Add or Update Player</h3>
        <div className="grid grid-cols-2 gap-2">
          <input name="name" placeholder="Name" value={newPlayer.name} onChange={handleNewPlayerChange} className="p-2 border rounded" />
          <input name="height" placeholder="Height" value={newPlayer.height} onChange={handleNewPlayerChange} className="p-2 border rounded" />
          <input name="weight" placeholder="Weight" value={newPlayer.weight} onChange={handleNewPlayerChange} className="p-2 border rounded" />
          <input name="threePoint" placeholder="Three Point %" value={newPlayer.threePoint} onChange={handleNewPlayerChange} className="p-2 border rounded" />
          <input name="fieldGoal" placeholder="Field Goal %" value={newPlayer.fieldGoal} onChange={handleNewPlayerChange} className="p-2 border rounded" />
          <input name="defense" placeholder="Defense" value={newPlayer.defense} onChange={handleNewPlayerChange} className="p-2 border rounded" />
          <input name="position" placeholder="Position" value={newPlayer.position} onChange={handleNewPlayerChange} className="p-2 border rounded" />
        </div>

        <button
          onClick={addOrUpdatePlayer}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"

        >
          {editingIndex !== null ? 'Update Player' : 'Add Player'}
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Created Players</h3>
        <ul>
          {userPlayers.map((player, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{player.name}</span>
              <div>
                <button
                  onClick={() => handleEditPlayer(index)}
                  className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePlayer(index)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          
        </ul>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Simulation Result</h2>
            <p>{result}</p>
            <button onClick={() => setIsModalOpen(false)} className="modal-button">
              Close
            </button>
          </div>
        </div>
      )}
              {/* ↓↓↓ put Legends link at bottom ↓↓↓ */}
              <div className="text-center mt-4">
          <Link to="/about" className="btn btn-info m-2">
            Legends
          </Link>
        </div>
      </div>
    </div>
  );
};


export default SimulateMatchup;

