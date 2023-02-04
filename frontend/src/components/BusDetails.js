import { useBusesContext } from "../hooks/useBusesContext";
import { useEffect } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
const BusesDetails = ({ bus }) => {
  const { dispatch } = useBusesContext();
  const { available } = bus;

  const handleClick = async () => {
    const response = await fetch("/api/buses/" + bus._id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_BUS", payload: json });
    }
  };
  const handleUpdate = () => {
    const isAvailable = available;
    const updateAvailable = {
      available: !isAvailable,
    };
    fetch("/api/buses/" + bus._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateAvailable),
    }).then((r) => r.json());
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
  }, [handleUpdate]);

  return (
    <div className="bus-details">
      {!available && (
        <h3 style={{ color: "red", textAlign: "center" }}>Booked</h3>
      )}
      <h4>{bus.driver}</h4>
      <p>
        <strong>ETA :</strong> {bus.time}
      </p>
      <p>
        <strong> license plate : </strong> {bus.liplate}
      </p>
      <p>
        <strong> phone : </strong> {bus.phone}
      </p>
      
    {!available&&
      <button className="book-button" onClick={handleUpdate}>Unbook</button>
    }
      <p>{formatDistanceToNow(new Date(bus.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default BusesDetails;
