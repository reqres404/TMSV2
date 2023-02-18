import { useEffect, useState } from "react";
import { useBusesContext } from "../hooks/useBusesContext";
//components
import BusesDetails from "../components/BusDetails";
import AdminPanel from "../components/AdminPanel/AdminPanel";

const Admin = () => {
    const { buses, dispatch } = useBusesContext();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [valid, setValid] = useState(false);

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

    const handleSubmit = (event) => {
        event.preventDefault();

        if (userName === "admin" && password === "admin") {
            setValid(true);
        }
        else{
            alert("Wrong Credentials entered")
        }

        setUserName("");
        setPassword("");
    };

    return (
        <div>
            {valid && (
                <div className="home">
                    <div className="buses">
                        <h1 style={{ textAlign: "center" }}>Admin Panel</h1>
                        <AdminPanel buses={buses} />
                        {buses &&
                            buses.map((bus) => (
                                <BusesDetails key={bus._id} bus={bus} />
                            ))}
                    </div>

                    {/* <BusForm /> */}
                </div>
            )}
            {!valid && (
                <form className="loginform" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={userName}
                        placeholder="UserName"
                        onChange={(event) => setUserName(event.target.value)}
                    />
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
            )}
        </div>
    );
};
export default Admin;
