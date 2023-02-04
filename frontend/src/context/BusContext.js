import {createContext,useReducer} from 'react'

export const BusesContext = createContext();


const busesReducer =(state,action)=>{
    switch(action.type){
        case 'SET_BUS':
            return{
                buses:action.payload
            }
        case 'CREATE_BUS':
            return{
                buses:[action.payload,...state.buses]
            }
        case 'DELETE_BUS':
            return{
                buses:state.buses.filter((w)=>w._id !== action.payload._id)
            }
        case 'UPDATE_BUS':
            return{
                buses:state.buses.filter((w)=>w._id == action.payload._id)
            }
        default:
            return state
    }
}

export const BusesContextProvider = ({children}) =>{

    const [state,dispatch] = useReducer(busesReducer,{buses:null})

    return(
        
    <BusesContext.Provider value={{...state,dispatch}}>
        {children}
    </BusesContext.Provider>
    )
}