import React from "react";
import JobPreviewBox from "./JobPreviewBox";
export default function WeeklySchedule(props) {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  var currentWeekDays = [];
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var lastSunday = new Date(today.setDate(today.getDate() - today.getDay()));
  for (let i = 0; i < 7; i++) {
    let tempDate = new Date(lastSunday);

    tempDate.setDate(tempDate.getDate() + i);
    currentWeekDays.push(tempDate);
  }

  return (
    <div className="weekly-schedule-container">
      {currentWeekDays.map((day) => {
        return (
          <div className="weekly-schedule-column">
            <h1>{days[day.getDay()]}</h1>
            <h2>{day.getDate()}</h2>
            {props.jobs
              .filter((job) => {
                let tDate = new Date(job[2]);
                return day.getTime() === tDate.getTime();
              })
              .map((job) => {
                return (
                  <JobPreviewBox
                    day={day}
                    job={job}
                    linenList={props.linenList}
                    napkinsList={props.napkinsList}
                  />
                );
              })}
          </div>
        );
      })}
    </div>
  );
}
