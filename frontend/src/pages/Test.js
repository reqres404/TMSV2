import { useState } from 'react';

const Test =()=>{
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [valid,setValid] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(userName==="admin" && password==="admin"){
        setValid(true)
    }

    userName('');
    setUserName('');
  };

  return (
    <div>
    {!valid &&
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="userName"
        name="userName"
        value={userName}
        placeholder="UserName"
        onChange={(event) =>
          setUserName(event.target.value)
        }
      />

      <br />
      <br />

      <input
        type="password"
        id="password"
        name="password"
        value={password}
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button type="submit">Submit</button>

      <br />
      <br />
    </form>
    }
    {valid && 
        <div>
            <h1>Well this works</h1>
        </div>
    }
    </div>
  );
}
export default Test