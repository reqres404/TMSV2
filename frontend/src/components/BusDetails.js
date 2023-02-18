import { useBusesContext } from "../hooks/useBusesContext";
import { useEffect, useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
const BusesDetails = ({ bus }) => {
  const [isOwner,setIsOwner] = useState(true)
  const [isAvailable,setIsAvailable] = useState(true)
  const { dispatch } = useBusesContext();
  const { available , contract,userBooked} = bus;

  const handleClick = async () => {
    const response = await fetch("/api/buses/" + bus._id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_BUS", payload: json });
    }
  };
  const handleAvailable = () => {
    setIsAvailable(!isAvailable)
    fetch("/api/buses/" + bus._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({available:!available,userBooked:"Admin"}),
    }).then((r) => r.json());
  };
  const handleOwnership = () => {
    const isOwned = contract;
    setIsOwner(!isOwner)
    fetch("/api/buses/" + bus._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({contract: !isOwned}),
    }).then((r) => r.json());
  };
  useEffect(() => {
    const fetchBus = async () => {
      try{
      const response = await fetch("/api/buses");
      const json = await response.json();
      
      if (response.ok) {
        dispatch({ type: "SET_BUS", payload: json });
      }
      
    }
    catch(error){
      console.log(error.message)
    }
    };
    fetchBus();    
  }, [isOwner,isAvailable]);

  return (
    <div className="bus-details">
      
      
      <h4>{bus.driver}</h4>
      <h4>
        <div style={{display: "flex" , justifyContent:"start", gap:"1rem"}}>
        {!bus.contract && <p style={{color:"red"}}>Owned </p>}
        {!available && (<p style={{ color: "red"}}>Booked by {bus.userBooked}</p>)}
      </div>
      </h4>
      <p>
        <strong>Date :</strong> {bus.time}
      </p>
      <p>
        <strong>Route :</strong> {bus.route}
      </p>
      <p>
        <strong>Occupancy :</strong> {bus.occupancy}
      </p>
      <p>
        <strong> license plate : </strong> {bus.liplate}
      </p>
      <p>
        <strong> phone : </strong> {bus.phone}
      </p>
      
      <p>{formatDistanceToNow(new Date(bus.createdAt), { addSuffix: true })}</p>
      {available?
    <button className="book-button" onClick={handleAvailable}>Book</button>:
    <button className="book-button" onClick={handleAvailable}>Unbook</button>
    }
    {contract?
    <button className="book-button" onClick={handleOwnership}>Make Owned</button>:
    <button className="book-button" onClick={handleOwnership}>Unown</button>
    }
      <span className="material-symbols-outlined" onClick={handleClick} style={{backgroundColor:"rgb(222, 116, 116)" , color:"rgb(157, 9, 56)"}}>
        delete
      </span>
      <br/>

    </div>

  );
};

export default BusesDetails;
