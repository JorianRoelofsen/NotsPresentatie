import './styles.css';
import { useState } from 'react';
import { handleGetRequest, handlePostRequest } from './actions/actions';

function App() {
  const [name, setName] = useState('');

  return (
    <div className="App">
      {/* GET REQUEST */}
      <div className='inputfields'>
        <button onClick={() => handleGetRequest()}>Get request</button>
      </div>

      <hr />

      {/* POST REQUEST */}
      <div className='inputfields'>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={() => handlePostRequest(name)}>Post request</button>
      </div>
    </div>
  );
}

export default App;
