// App.js
import React from "react";
import { useState,useEffect } from "react";
import AppointmentColumn from "./components/AppointmentColumn";
import './App.css'
const App = () => {
  const actions = ["appointment", "follow-up", "refill", "referral"];

      const [appointments,setAppointments]=useState([]);
  
  
      useEffect(()=>{
          fetchData();
      },[])
  
      async function fetchData(){
          let getAppointments=await fetch("https://medical-appointments-1.onrender.com");
          getAppointments=await getAppointments.json();
          console.log(getAppointments);
  
          setAppointments(getAppointments.appointments)
      }

  const groupedAppointments = actions.reduce((acc, action) => {
    acc[action] = appointments.filter((a) => a.action === action);
    return acc;
  }, {});

  return (
    <div>
      <h1 className="title">Medical Dashboard</h1>
      <div className="container">
        {actions.map((action) => (
          <AppointmentColumn
            key={action}
            title={action.charAt(0).toUpperCase() + action.slice(1)}
            data={groupedAppointments[action]}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
