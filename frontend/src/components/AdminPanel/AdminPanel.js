
import { useEffect, useState } from "react";
import "./adminPanel.css";
const AdminPanel = ({buses}) => {
    
    const [totalStudents, setTotalStudents] = useState(null);
    const [totalSeats, setTotalSeats] = useState(null);
    const [numberOfOwnedBuses,setNumberOfOwnedBuses] = useState(0)
    const [numberOfContractedBuses,setNumberOfContractedBuses] = useState(0)
    const [extraSeats, setExtraSeats] = useState(0)
    const [totalBookedBuses, setTotalBookedBuses] = useState(0)
    const [totalUnbookedBuses, setTotalUnbookedBuses] = useState(0)
    const [totalNumberOfSeats,setTotalNumberOfSeats] = useState(null)
    let totalbook=0
    let totalUnbook = 0
    let seatsNeeded = 0;
    let totalAvailableSeats =0;
    let showSeats;
    
    useEffect(()=>{
        buses.map((bus)=>{
            if(!bus.contract){
                ownCount++
            }
            else{
                contractCount++
            }
        })
        buses.map((bus)=>{
            if(!bus.available){
                totalbook++
            }
            else{
                totalUnbook++
            }
        })
        
        buses.map((bus)=>{
            if(!bus.available){
                totalAvailableSeats = totalAvailableSeats+bus.occupancy
                
            }
        })
        setTotalNumberOfSeats(totalAvailableSeats)
        setTotalBookedBuses(totalbook)
        setTotalUnbookedBuses(totalUnbook)
        setNumberOfContractedBuses(contractCount)
        setNumberOfOwnedBuses(ownCount)
        
    })
    let numberOfseats = 0 
    let ownCount = 0;
    let contractCount= 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        // buses.map((bus)=>(numberOfseats=numberOfseats+bus.occupancy))
        buses.map((bus)=>{
            if(!bus.available){
                numberOfseats=numberOfseats+bus.occupancy
                
            }
        })
        
        let occupancyInPercent = parseFloat((totalStudents/numberOfseats)*100).toFixed(2)
        let seatsNeeded = totalStudents - numberOfseats
        if(seatsNeeded>0){
            setExtraSeats(seatsNeeded)
        }
        else{
            setExtraSeats(0)
        }
        setTotalSeats(occupancyInPercent);


        // numberOfseats =0
        
    };
    return (
        <div className="admin-panel">
            <form className="students-input-contianer" onSubmit={handleSubmit}>
                <label>Students:</label>
                <input
                    type="number"
                    placeholder="No. of students"
                    onChange={(e) => setTotalStudents(e.target.value)}
                    // className={emptyFields.includes('titles')?'error':''}
                />
                <button className="students-input-button" type="submit">
                    Enter
                </button>
            </form>
            <div className="panel-container">
                <div className="total-occupancy">
                    <h3>Total Occupancy : </h3>  
                    <h1>{totalSeats}%</h1>
                    <h1><div className="progressBar" style={{width:`${totalSeats}%`}}></div></h1>  
                    <h3>Total Students: <strong>{totalStudents}</strong></h3>
                    <h3>Available Seats: <strong>{totalNumberOfSeats}</strong></h3>
                    <h3>Seats Needed : <strong>{extraSeats}</strong></h3>
                </div>
                <div className="total-buses">
                    <h3>Total buses:</h3>
                    <h2>{numberOfContractedBuses+numberOfOwnedBuses}</h2>
                    <h3>Owned Buses:</h3> 
                    <h2>{numberOfOwnedBuses}</h2>
                    <h3>Contracted Buses:</h3>
                    <h2>{numberOfContractedBuses}</h2>
                    </div>
                <div className="total-booked-buses">
                    <h3>Total Reserved Buses:</h3>
                    <h1>{totalBookedBuses}</h1>
                    <br/>
                    <h3>Total Available Buses:</h3>
                    <h1>{totalUnbookedBuses}</h1>
                </div>
            </div>
        </div>
    );
};
export default AdminPanel;
