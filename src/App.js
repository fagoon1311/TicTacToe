import './App.css';
import Tictac from './components/TicTac.js';

function App() {
  return (
    <div className="App flex flex-col items-center justify-start h-full w-full bg-gradient-to-b from-zinc-900 to-cyan-900">
      <h1 className="text-6xl font-bold text-cyan-400 mt-4">TIC-TAC-TOE</h1>
      <div className="flex items-center justify-center flex-row mt-10">
        <Tictac />
      </div>
    </div>
  );
}



export default App;


//