import "./BarGraph.scss";
function BarGraph(props) {
    const totalSeats = props.routes[0]+props.routes[1]+props.routes[2]+props.routes[3]
    var R1 = props.routes[0]/totalSeats*100
    var R2 = props.routes[1]/totalSeats*100
    var R3 = props.routes[2]/totalSeats*100
    var R4 = props.routes[3]/totalSeats*100
    R1 = ~~ R1
    R2 = ~~ R2
    R3 = ~~ R3
    R4 = ~~ R4
    
    console.log(R1)
    return (
        <div>
        <dl>
            <dd className={`percentage percentage-${R1}`}></dd>
            <span class="text">Pimpri : {props.routes[0]} Seats</span>
            
            <dd className={`percentage percentage-${R2}`}></dd>
            <span class="text">Hinjewadi : {props.routes[1]} Seats</span>
            
            {/* <dt className="text">Hinjewadi</dt> */}
            <dd className={`percentage percentage-${R3}`}></dd>
            <span class="text">Balewadi : {props.routes[2]} Seats</span>
            <dd className={`percentage percentage-${R4}`}></dd>
            <span class="text">Katraj : {props.routes[3]} Seats</span>

        </dl>
        </div>
    );
}

export default BarGraph;
