import { useBusesContext } from "../../hooks/useBusesContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import "./BookDetails.css";
import { useEffect } from "react";
const BookDetails = ({ bus }) => {
    const { dispatch } = useBusesContext();
    const{available} = bus
    const handleUpdate = () =>{
        const isAvailable =  available
        const updateAvailable ={
            available:!isAvailable,
        }
        fetch("/api/buses/"+bus._id,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(updateAvailable)
        })
            .then((r)=>r.json())

    }
    useEffect(() => {
        const fetchBus = async () => {
          const response = await fetch("/api/buses");
          const json = await response.json();
    
          if (response.ok) {
            dispatch({type:'SET_BUS',payload:json})
          }
        };
        fetchBus();
      }, [handleUpdate]);

  return (

    <div className="book-details">
        {!available && 
            <h3 style={{color:"red",textAlign:"center"}}>Booked</h3>
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
      <p>{formatDistanceToNow(new Date(bus.createdAt), { addSuffix: true })}</p>
      {available && 
      <span className="material-symbols-outlined" onClick={handleUpdate}>
        Book
      </span>
      }
    </div>
  );
};

export default BookDetails;
