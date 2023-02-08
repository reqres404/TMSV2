import { useState } from 'react';
import AdminPanel from '../components/AdminPanel/AdminPanel';

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
      <AdminPanel/>
    </div>
  );
}
export default Test