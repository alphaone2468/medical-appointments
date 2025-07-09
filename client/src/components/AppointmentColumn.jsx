// AppointmentColumn.js
import { SlCalender } from "react-icons/sl";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FaBriefcaseMedical } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const AppointmentColumn = ({ title, data, bookAppointment }) => {

  return (
<div className="column">
  <h2>{title}</h2>
  {data.map((apt, idx) => (
    <div
      key={idx}
      className="appointment-card"
      style={{
        backgroundColor: (apt.status === "booked" || apt.status==="processed") ? "#c1ffc1" : "#eaf6ff",
        position: "relative",
      }}
    >
      <div>
        <strong>Name:</strong> {apt.patientName}
      </div>
      <div>
        <strong>Reason:</strong> {(apt.reason)?apt.reason:"-"}
      </div>
      <div>
        <strong>Status:</strong> {apt.status}
      </div>
      <div>
        <strong>Time:</strong> {(new Date(apt.time).toLocaleString()==="Invalid Date"?"PT Will Schedule":new Date(apt.time).toLocaleString())}
      </div>

      {title.toLowerCase() === "new appointment" && (
  <>
    <span id={`calendar-icon-new-${idx}`} className="icon-wrapper" onClick={()=>bookAppointment(apt._id,title)}>
      <SlCalender fontSize={"20px"} />
    </span>
    <Tooltip anchorSelect={`#calendar-icon-new-${idx}`} place="top">
      Schedule Appointment
    </Tooltip>
  </>
)}

{title.toLowerCase() === "follow-up appointments" && (
  <>
    <span id={`calendar-icon-followup-${idx}`} className="icon-wrapper"onClick={()=>bookAppointment(apt._id,title)}>
      <SlCalender  fontSize={"20px"}/>
    </span>
    <Tooltip anchorSelect={`#calendar-icon-followup-${idx}`} place="top">
      Schedule Follow up Appointment
    </Tooltip>
  </>
)}


      {title.toLowerCase() === "prescription refill" && (
        <>
          <span id={`medical-icon-${idx}`} className="icon-wrapper" onClick={()=>bookAppointment(apt._id,title)}>
            <FaBriefcaseMedical fontSize={"20px"} />
          </span>
          <Tooltip anchorSelect={`#medical-icon-${idx}`} place="top">
            Process Refill
          </Tooltip>
        </>
      )}

      {title.toLowerCase() === "referral consultant" && (
        <>
          <span id={`doctor-icon-${idx}`} className="icon-wrapper" onClick={()=>bookAppointment(apt._id,title)}>
            <FaUserDoctor fontSize={"20px"} />
          </span>
          <Tooltip anchorSelect={`#doctor-icon-${idx}`} place="top">
            Process Referral
          </Tooltip>
        </>
      )}
    </div>
  ))}
</div>

  );
};

export default AppointmentColumn;
