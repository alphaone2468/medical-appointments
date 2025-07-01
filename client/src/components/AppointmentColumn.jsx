// AppointmentColumn.js
import React from "react";

const AppointmentColumn = ({ title, data }) => {
  return (
    <div className="column">
      <h2>{title}</h2>
      {data.map((apt, idx) => (
        <div key={idx} className="card">
          <div><strong>Name:</strong> {apt.patientName}</div>
          <div><strong>Reason:</strong> {apt.reason}</div>
          <div><strong>Status:</strong> {apt.status}</div>
          <div><strong>Time:</strong> {new Date(apt.time).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentColumn;
