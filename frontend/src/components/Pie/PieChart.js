import "./PieChart.css";
const PieChart = (props) => {
    var part = props.totalSeats;
    if(props.totalSeats==null){
        part = 100
    }

    return (
        <div>
            <div className="pie" style={{"--p":part}}>
                {" "}
                {props.totalSeats}%
            </div>

        </div>
    );
};
export default PieChart;
