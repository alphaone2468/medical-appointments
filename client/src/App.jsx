// App.js
import React from "react";
import { useState,useEffect } from "react";
import AppointmentColumn from "./components/AppointmentColumn";
import './App.css'
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const actions = ["appointment", "follow-up", "refill", "referral"];
  const actionTitle = ["New Appointment", "follow-up Appointments", "Prescription Refill", "Referral Consultant"];

  const [appointments,setAppointments]=useState([]);
  let date=new Date();
  console.log(date.getDate())
  console.log(date.getMonth())
  console.log(date.getFullYear())

  const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

  date=`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`

  const timeString = `${hours}:${minutes}:${seconds}`;


  
  
      useEffect(()=>{
          fetchData();
      },[])
  
      async function fetchData(){
        // https://medical-appointments-1.onrender.com
          let getAppointments=await fetch("http://localhost:5000");
          getAppointments=await getAppointments.json();
          console.log(getAppointments);
  
          setAppointments(getAppointments.appointments)
      }


  const groupedAppointments = actions.reduce((acc, action) => {
    acc[action] = appointments
      .filter((a) => a.action === action)
      .sort((a, b) => new Date(a.time) - new Date(b.time)); 
    return acc;
  }, {});


    async function bookAppointment(id,title) {
    let response =await fetch(`http://localhost:5000/book-appointment/${id}`,{
      method:"POST",
      body:JSON.stringify({
        title:title
      }),
      headers:{
        'Content-Type':"application/json"
      }
    })
    response = await response.json();

    console.log(response);

    setAppointments(()=>{
      return appointments.map((e)=>{
        if(e._id!==id){
          return e
        }
        else{
          if(title==="Prescription Refill"){
            return {...e,status:"processed"}
          }
          else{
            return {...e,status:"booked"}
          }
        }
      })
    })

    console.log(title);
    if(title==="follow-up Appointments" || title==="New Appointment"){
      toast.success(
        "Appointment has been booked"
      );
    }
    else if(title==="Prescription Refill"){
      toast.success(
        "Prescription Refill is done"
      );
    }
    else{
      toast.success(
        "Referral Consultant is done"
      );
    }
  }




  return (
    <>
    <Toaster 
  position="top-center"
  toastOptions={{
    style: {
      padding: '10px',
      fontSize: '17px',
      fontFamily: 'Lato, sans-serif',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
    },
    success: {
      duration: 5000,
      theme: {
        primary: '#4aed89',
      },
      style: {
        color: 'green',
        backgroundColor: "#e7ffe7",
      },
    },
  }}
/>




    <div>
      <div className="header">
        <img src="https://primarycareofkansas.com/wp-content/uploads/2023/03/primary-care-logo-1.png" alt="" height={"60px"}  />
        <div>
        <p className="date">{date}</p>
        <p className="date">{timeString}</p>

        </div>
      </div>
      <p className="providerName"> Provider Name :- <strong>Dr. Saboor Rashid </strong></p>
      <div className="container">
        {actions.map((action,index) => (
          <AppointmentColumn
            key={action}
            title={actionTitle[index]}
            data={groupedAppointments[action]}
            bookAppointment={bookAppointment}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default App;
