import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [posts, setPosts] = useState();

   const makeApirequest = () => {
    fetch('/api/testwithcurrentuser')
      .then((response) => response.json())
      .then((resp) => {
        console.log(resp);
        setPosts(resp);
      })
      .catch((err) => console.log(err));
   };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <button onClick={makeApirequest}>
        Make Api request !!
      </button>
    </div>
  );
}

export default App;
