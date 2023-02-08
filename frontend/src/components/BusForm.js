import { setDate } from "date-fns";
import { useState } from "react";
import { useBusesContext } from "../hooks/useBusesContext";
const BusForm = () => {
  const { dispatch } = useBusesContext();
  const [driver, setDriver] = useState("");
  const [route, setRoute] = useState("");
  const [occupancy, setOccupancy] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [liplate, setLiplate] = useState("");
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  const [emptyFields,setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bus = { driver,route,occupancy, time, date,phone, liplate };

    const response = await fetch("/api/buses", {
      method: "POST",
      body: JSON.stringify(bus),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      // setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setDriver("");
      setRoute("");
      setOccupancy("")
      setTime("");
      setDate("");
      setLiplate("");
      setPhone("");      
      setError(null);
      setEmptyFields([])
      
      console.log("New Bus Added");
      console.log(json);
      dispatch({ type: "CREATE_BUS", payload: json });
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <label>Driver Name</label>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setDriver(e.target.value)}
        value={driver}
        // className={emptyFields.includes('titles')?'error':''}
      />

      <label>Route </label>
      <input
        type="text"
        placeholder="Start-to-End"
        onChange={(e) => setRoute(e.target.value)}
        value={route}
        // className={emptyFields.includes('titles')?'error':''}
      />
      <label>occupancy</label>
      <input
        type="number"
        placeholder="No. of seats"
        onChange={(e) => setOccupancy(e.target.value)}
        value={occupancy}
        // className={emptyFields.includes('titles')?'error':''}
      />
      <label>Time: </label>
      <input
        type="time"
        placeholder="DD/MM/YYYY"
        onChange={(e) => setTime(e.target.value)}
        value={time}
        // className={emptyFields.includes('load')?'error':''}
      />
      <label>Date: </label>
      <input
        type="date"
        placeholder="DD/MM/YYYY"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        // className={emptyFields.includes('load')?'error':''}
      />

      <label>License Plate: </label>
      <input
        placeholder="MHXX XXXX"
        type="text"
        onChange={(e) => setLiplate(e.target.value)}
        value={liplate}
        // className={emptyFields.includes('load')?'error':''}
      />

      <label>Phone: </label>
      <input
        type="tel"
        placeholder="+91: "
        onChange={(e) => setPhone(e.target.value)}
        value={phone}

        // className={emptyFields.includes("reps") ? "error" : ""}
      />

      <button>Add Bus</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default BusForm;
