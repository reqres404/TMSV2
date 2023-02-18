import { useEffect } from "react";
import { useBusesContext } from "../hooks/useBusesContext";
//components

import BusForm from "../components/BusForm";

const Register = () => {
  const{dispatch} = useBusesContext()
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
    <div>
      <h1 style={{textAlign:"center", margin:"0px"}}>Register</h1>
      <br/>
    <div className="loginform">
      <BusForm/>
    </div>
    </div>
  );
};
export default Register;
