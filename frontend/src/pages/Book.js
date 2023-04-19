import { useEffect,useState } from "react";
import { useBusesContext } from "../hooks/useBusesContext";
//components
import BookDetails from "../components/Book/BookDetails";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Book = () => {
    const [userAuth, setUserAuth] = useState(false);
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const { buses, dispatch } = useBusesContext();
    useEffect(() => {
        const fetchBus = async () => {
            const response = await fetch("/api/buses");
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: "SET_BUS", payload: json });
            }
        };
        fetchBus();
    }, [dispatch]);
    const handleSubmit = () => {
        if (user === "user1" && pass === "pass1") {
            setUserAuth(true);
        }
        else if(user === "user2" && pass === "pass2"){
            setUserAuth(true)
        }
        
        else if(user === "user3" && pass === "pass3"){
            setUserAuth(true)
        }
        
        else{
            alert("Wrong Credentials entered")
        }
    };
    return (
        <div className="book">
            <div className="buses">
                <h1 style={{ textAlign: "center", margin: "0px" }}>
                    Registered Buses
                </h1>
                {!userAuth && (
                    <form className="loginform" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={user}
                            placeholder="UserName"
                            onChange={(event) => setUser(event.target.value)}
                        />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={pass}
                            placeholder="Password"
                            onChange={(event) => {
                                setPass(event.target.value);
                            }}
                        />
                        <button type="submit">Submit</button>

                        <br />
                        <br />
                    </form>
                )}
                {userAuth && (
                    <div>
                        {buses &&
                            buses.map((bus) => (
                                <BookDetails user={user} key={bus._id} bus={bus} />
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Book;
