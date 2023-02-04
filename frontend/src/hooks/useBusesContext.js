import { BusesContext } from '../context/BusContext';
import { useContext } from 'react'

export const useBusesContext =()=>{
    const context = useContext(BusesContext);
    
    if(!context){
        throw Error("useBusesContext must be inside BusContextProvider")
    }

    return context
}