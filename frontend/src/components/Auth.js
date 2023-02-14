import {useEffect,useState} from "react"
import axios from 'axios'
const Auth=()=>{
    const [userData,setUserData] = useState('')
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [auth,setAuth]= useState(false)
const handleAuth = (e)=>{
        e.preventDefault()
        setUserData(userName+password)
        console.log(userData)
            const fetchData= async()=> {
            try {
                const response = await axios.get("/api/buses/register/users")
                const data = response.data
                const auth = []
                await data.map((user)=>auth.push(user.username +user.password))
                if(auth.length>0){
                    if(auth.includes(userData)){
                        console.log("Authenticated")
                        setUserData('')
                        setAuth(true)
    
                    }
                }
                else{
                    console.log("Not Authenticated")
                }
                // console.log(users)
                      
            } catch (error) {
              console.error(error);
            }
          }
          fetchData()
    }  
    useEffect(()=>{
        setUserData(userName+password)
        
    },[handleAuth])

    return(
    <div>
        <form className="register" onSubmit={handleAuth}>
            <label>Username</label>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e)=>setUserName(e.target.value)}
                    value={userName}
                />

            <label>Password</label>
                <input
                    type="password"
                    placeholder= "password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                />
            <button>Sign In</button>
        </form>
        {auth&&
        <p style={{color :"white"}}>hi</p>}
    </div>
    )
}
export default Auth