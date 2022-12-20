import { React, useState } from "react";
import JobForm from "./JobForm";
import CheckBox from "./CheckBox";
const API_BASE = "http://localhost:3001";

export default function JobPage(props) {
  const [jobFormOpen, setJobFormOpen] = useState(false);
  const jobDate = new Date(props.job.date);

  const handleCheckBoxChange = (event) => {
    fetch(API_BASE + "/jobs/attribute/" + props.job._id, {
      method: "PUT",
      body: JSON.stringify({
        attribute: event.target.name,
        value: event.target.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        console.log(res);
        props.fetchJobs();
      })
      .catch((err) => console.error("Error:", err));
  };

  const getLinenNameFromId = (id) => {
    for (let i = 0; i < props.linenList.length; i++) {
      if (props.linenList[i][1] === id) {
        return [
          props.linenList[i][0],
          props.linenList[i][6],
          props.linenList[i][7],
        ];
      }
    }
  };

  const getNapkinNameFromId = (id) => {
    for (let i = 0; i < props.napkinsList.length; i++) {
      if (props.napkinsList[i][1] === id) {
        return props.napkinsList[i][0];
      }
    }
  };
  return (
    <div className="job-page-modal">
      {jobFormOpen ? (
        <JobForm
          job={props.job}
          setJobFormModalActive={setJobFormOpen}
          linenList={props.linenList}
          napkinsList={props.napkinsList}
          fetchJobs={props.fetchJobs}
        />
      ) : (
        ""
      )}
      <div className="job-page-content">
        <div className="job-page-top-bar">
          <div>
            <h1>Name of client: {props.job.client_name}</h1>
          </div>

          <div className="top-bar-right">
            <div
              className="job-page-edit-button"
              onClick={() => {
                setJobFormOpen(true);
              }}
            >
              Edit
            </div>
            <h2
              className="exit-button"
              onClick={() => props.setJobPageOpen(false)}
            >
              x
            </h2>
          </div>
        </div>
        <CheckBox
          checked={props.job.sent_invoice}
          title={"sent invoice"}
          attribute_id={"sent_invoice"}
          onChangeFunction={handleCheckBoxChange}
        />
        <CheckBox
          checked={props.job.paid}
          title={"paid"}
          attribute_id={"paid"}
          onChangeFunction={handleCheckBoxChange}
        />
        <CheckBox
          checked={props.job.linen_picked_up}
          title={"Linen picked up"}
          attribute_id={"linen_picked_up"}
          onChangeFunction={handleCheckBoxChange}
        />

        <h4>Job ID: {props.job.job_id}</h4>
        <h2>Date: {jobDate.toDateString()}</h2>
        <h2>Location: {props.job.location}</h2>
        <h2>bouqette: {"" + props.job.bouqette}</h2>
        <div className="linen-table">
          {props.job.linen.map((linen, index) => {
            const linenData = getLinenNameFromId(linen.unique_id);
            console.log(linen);
            if (linenData) {
              return (
                <h4 key={index}>
                  {linen.count} - {linenData[0]} - ${linenData[1]}
                </h4>
              );
            }
          })}

          {props.job.napkins.map((napkin, index) => {
            return (
              <h4 key={index} className="napkin-text">
                {napkin.count} - {getNapkinNameFromId(napkin["unique_id"])}
              </h4>
            );
          })}
        </div>

        <p>{props.job.notes}</p>
      </div>
    </div>
  );
}
