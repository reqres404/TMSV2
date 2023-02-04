import { useEffect } from "react";
import { useBusesContext } from "../hooks/useBusesContext";
//components
import BookDetails from "../components/Book/BookDetails";

const Book = () => {
  const{buses,dispatch} = useBusesContext()
  useEffect(() => {
    const fetchBus = async () => {
      const response = await fetch("/api/buses");
      const json = await response.json();

      if (response.ok) {
        dispatch({type:'SET_BUS',payload:json})
      }
    };
    fetchBus();
  }, [dispatch]);

  return (
    <div className="book">
      <div className="buses">
      <h1 style={{textAlign:"center", margin:"0px"}}>Registered Buses</h1>

        {buses &&
          buses.map((bus) => (
            <BookDetails key={bus._id} bus={bus} />
          ))}
      </div>

    </div>
  );
};
export default Book;
