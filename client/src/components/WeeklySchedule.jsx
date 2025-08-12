import React from "react";
import JobPreviewBox from "./JobPreviewBox";
export default function WeeklySchedule(props) {
  const keys = Object.keys(props.jobs);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentWeekDays = [];
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastSunday = new Date(today.setDate(today.getDate() - today.getDay()));
  for (let i = 0; i < 7; i++) {
    const tempDate = new Date(lastSunday);
    tempDate.setDate(tempDate.getDate() + i);
    currentWeekDays.push(tempDate);
  }

  return (
    <div className="weekly-schedule-container">
      {currentWeekDays.map((day, index) => {
        return (
          <div key={index} className="weekly-schedule-column">
            <div className="week-header">
              <div className="week-day">{days[day.getDay()]}</div>
              <div className="week-date">{day.getDate()}</div>
            </div>
            <div className="week-events">
              {Object.keys(props.jobs).map((key, idx) => {
                const jobDate = new Date(props.jobs[key].date);
                if (day.getTime() === jobDate.getTime()) {
                  return (
                    <JobPreviewBox
                      key={idx}
                      day={day}
                      job={props.jobs[key]}
                      linenList={props.linenList}
                      napkinsList={props.napkinsList}
                      fetchJobs={props.fetchJobs}
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
