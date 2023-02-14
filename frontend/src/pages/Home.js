import React from 'react';
import Bus from '../icons/Bus'
const Home = () => {

  return (
    <div>
      <h1 style={{textAlign:"center"}}><span>Welcome TO TMS</span></h1>
      <p style={{textAlign:"center", fontSize:"22px"}}>One stop solution for all School/College bus management needs </p>
      <div className="running-bus">
        <Bus/>
      </div>
      
    </div>
  );
};
export default Home;
