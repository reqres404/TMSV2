import { useBusesContext } from "../../hooks/useBusesContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import "./BookDetails.css";
import { useEffect, useState } from "react";

const BookDetails = ({ bus,user }) => {
    
    const [seatsEnter, setSeatsEnter] = useState(0);
    const [uwb,setUwb] = useState("")
    const[isUpdate,setIsUpdate]=useState(true)
    const[isSeatNum,setIsSeatSum] = useState(true)
    const { dispatch } = useBusesContext();
    const { available, occupancy,userBooked} = bus;
    
    const handleUpdate = () => {
        console.log(user)
        setIsUpdate(!isUpdate)
        const isAvailable = available;
        fetch("/api/buses/" + bus._id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ available: !isAvailable,userBooked:user }),
        }).then((r) => r.json());
    };
    //Code for updating
    const handleSeatNum = (e) => {
        setIsSeatSum(!isSeatNum)
        e.preventDefault();
        if (seatsEnter > bus.occupancy || seatsEnter < 0 || seatsEnter==null) {
            alert("please enter valid amount of seats");
        } else {
            let liplate = bus.liplate
            console.log(bus.occupancy);
            fetch("/api/buses/" + bus._id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ occupancy: bus.occupancy - seatsEnter }),          
              }).then((r) => r.json());
              alert(seatsEnter + " seats booked of bus with license plate "+liplate);
        }
    };
    useEffect(() => {
        const fetchBus = async () => {
            const response = await fetch("/api/buses");
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: "SET_BUS", payload: json });
            }
        };
        fetchBus();
        setSeatsEnter("")
        
    }, [isUpdate,isSeatNum]);


    return (
        <div className="book-details">
            {!available && (
                <h3 style={{ color: "red", textAlign: "center" }}>Booked {bus.userBooked}</h3>
            )}
            {!available &&
                <></>
                ||<></>
            }
            <h4>{bus.driver}</h4>
            <p>
                <strong>Route :</strong> {bus.route}
            </p>
            <p>
                <strong>Date :</strong> {bus.date}
            </p>
            <p>
                <strong>Time :</strong> {bus.time}
            </p>
            <p>
                <strong>Occupancy :</strong> {bus.occupancy}
            </p>
            <p>
                <strong> license plate : </strong> {bus.liplate}
            </p>
            <p className="phone">
                <strong> phone : </strong> {bus.phone}
            </p>
            <p>
                {formatDistanceToNow(new Date(bus.createdAt), {
                    addSuffix: true,
                })}
            </p>
            <div className="book-buttons">
            {available && (
                <button className="book-all" onClick={handleUpdate}>Book all Seats</button>
                
            )}
            {available && (
                <form className="book-seats-form" onSubmit={handleSeatNum}>
                    <input
                        className="book-seats-form-input"
                        type="number"
                        placeholder="No. Seats"
                        onChange={(e) => setSeatsEnter(e.target.value)}
                        value={seatsEnter}
                    />
                    <button className="book-seats-button" onClick={handleSeatNum}>
                        Book {seatsEnter} seats
                    </button>
                </form>
            )}
        </div>
        </div>
    );
};

export default BookDetails;
