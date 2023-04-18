
import { useEffect, useState } from "react";
import "./adminPanel.css";
import PieChart from "../Pie/PieChart";
import BarGraph from "../Bar/BarGraph"

const AdminPanel = ({buses}) => {
    
    const [totalStudents, setTotalStudents] = useState(null);
    const [totalSeats, setTotalSeats] = useState(null);
    const [numberOfOwnedBuses,setNumberOfOwnedBuses] = useState(0)
    const [numberOfContractedBuses,setNumberOfContractedBuses] = useState(0)
    const [extraSeats, setExtraSeats] = useState(0)
    const [totalBookedBuses, setTotalBookedBuses] = useState(0)
    const [totalUnbookedBuses, setTotalUnbookedBuses] = useState(0)
    const [totalNumberOfSeats,setTotalNumberOfSeats] = useState(null)
    const [seatsAtR1,setSeatsAtR1] = useState(0)
    const [seatsAtR2,setSeatsAtR2] = useState(0)
    const [seatsAtR3,setSeatsAtR3] = useState(0)
    const [seatsAtR4,setSeatsAtR4] = useState(0)




    let totalbook=0
    let totalUnbook = 0
    let totalAvailableSeats =0;
    let availableSeatsAtR1 = 0
    let availableSeatsAtR2 = 0
    let availableSeatsAtR3 = 0
    let availableSeatsAtR4 = 0
    
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
            if(bus.available && bus.route == "Narhe-to-Pimpri"){
                availableSeatsAtR1 = availableSeatsAtR1+bus.occupancy
                setSeatsAtR1(availableSeatsAtR1)
            }
            
            if(bus.available && bus.route == "Narhe-to-Hinjewadi"){
                availableSeatsAtR2 = availableSeatsAtR2+bus.occupancy
                setSeatsAtR2(availableSeatsAtR2)
            
            }
            if(bus.available && bus.route == "Narhe-to-Balewadi"){
                availableSeatsAtR3 = availableSeatsAtR3+bus.occupancy
                setSeatsAtR3(availableSeatsAtR3)
            
            }
            if(bus.available && bus.route == "Narhe-to-Katraj"){
                availableSeatsAtR4 = availableSeatsAtR4+bus.occupancy
                setSeatsAtR4(availableSeatsAtR4)
            
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
                    <PieChart totalSeats={totalSeats}/>
                    
                    <h3>Total Seats required: <strong>{totalStudents}</strong></h3>
                    <h3>Available Seats: <strong>{totalNumberOfSeats}</strong></h3>
                    <h3>Extra Seats Needed : <strong>{extraSeats}</strong></h3>
                </div>
                <div className="total-buses">
                    <h3>Total buses:</h3>
                    <span><h2>{numberOfContractedBuses+numberOfOwnedBuses}</h2></span>
                    <h3>Owned Buses:</h3> 
                    <span><h2>{numberOfOwnedBuses}</h2></span>
                    <h3>Contracted Buses:</h3>
                    <span><h2>{numberOfContractedBuses}</h2></span>
                    </div>
                <div className="total-booked-buses">
                    <h3>Total Reserved Buses: {totalBookedBuses}</h3>
                    <h3>Total Available Buses:{totalUnbookedBuses}</h3>
                    <br/>
                    <BarGraph routes={[seatsAtR1,seatsAtR2,seatsAtR3,seatsAtR4]} />
                </div>
            </div>
        </div>
    );
};
export default AdminPanel;
