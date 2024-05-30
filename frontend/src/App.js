import './styles.css';
import { useState } from 'react';
import { handleGetRequest, handlePostRequest } from './actions/actions';

function App() {
  const [email, setEmail] = useState('');
  const [getResponse, setGetResponse] = useState('');
  const [postResponse, setPostResponse] = useState('');
  //stap 3.2
  
  const handleClick = async (action, setter, value) => {
    const data = await action(value);
    setter(data);
  };

  //stap 3.3

  return (
    <div className="App">
      {/* GET REQUEST */}
      <div className='inputfields'>
        <button onClick={() => handleClick(handleGetRequest, setGetResponse)}>Get request</button>
      </div>
      <div>
        {getResponse}
      </div>

      <hr />

      {/* POST REQUEST */}
      {/* stap 3.4 */}
      <div className='inputfields'>
        <input 
          type="text" 
          value={email} 
          //stap 3.5
          onChange={(e) => setEmail(e.target.value)}
        />
        <button 
          onClick={() => handleClick(handlePostRequest, setPostResponse, email)}
          // stap 3.6
        >
          Post request
        </button>
      </div>
      <div>
        {postResponse}
      </div>
    </div>
  );
}

export default App;
