import { useState } from "react";
import { useBusesContext } from "../hooks/useBusesContext";
const BusForm = () => {
  const { dispatch } = useBusesContext();
  const [driver, setDriver] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [liplate, setLiplate] = useState("");
  const [error, setError] = useState("");
  // const [emptyFields,setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bus = { driver, time, phone, liplate };

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
      setTime("");
      setLiplate("");
      setPhone("");
      setError(null);
      // setEmptyFields([])
      console.log("New Bus Added");
      console.log(json);
      dispatch({ type: "CREATE_BUS", payload: json });
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Bus</h3>
      <label>Driver Name</label>
      <input
        type="text"
        onChange={(e) => setDriver(e.target.value)}
        value={driver}
        // className={emptyFields.includes('titles')?'error':''}
      />

      <label>Time (date): </label>
      <input
        type="text"
        onChange={(e) => setTime(e.target.value)}
        value={time}
        // className={emptyFields.includes('load')?'error':''}
      />

      <label>License Plate: </label>
      <input
        type="text"
        onChange={(e) => setLiplate(e.target.value)}
        value={liplate}
        // className={emptyFields.includes('load')?'error':''}
      />

      <label>Phone: </label>
      <input
        type="number"
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
