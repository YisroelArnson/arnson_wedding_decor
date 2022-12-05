import { React, useState } from "react";
import JobForm from "./JobForm";
export default function JobPage(props) {
  const [jobFormOpen, setJobFormOpen] = useState(false);
  const linen = JSON.parse(props.job[5]);
  const napkins = JSON.parse(props.job[6]);
  const linenValues = Object.values(linen);
  const napkinsValues = Object.values(napkins);
  const jobDate = new Date(props.job[2]);
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
          job={{
            job_id: props.job[0],
            name: props.job[1],
            date: props.job[2],
            location: props.job[3],
            job_type: props.job[4],
            linen: props.job[5],
            napkins: props.job[6],
            flowers: props.job[7],
            bouqette: props.job[8],
            notes: props.job[9],
            paid: props.job[10],
            sent_invoice: props.job[11],
            client_email: props.job[12],
            client_type: props.job[13],
            invoice_url: props.job[14],
            linen_picked_up: props.job[15],
          }}
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
          <h1>Name of client: {props.job[1]}</h1>
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
        <h2>Date: {jobDate.toDateString()}</h2>
        <h2>Location: {props.job[3]}</h2>
        <div className="linen-table">
          {linenValues.map((val, index) => {
            const linenData = getLinenNameFromId(val["unique_id"]);
            return (
              <h4 key={index}>
                {val["count"]} - {linenData[0]} - ${linenData[1]}
              </h4>
            );
          })}
          {napkinsValues.map((val) => {
            return (
              <h4 className="napkin-text">
                {val["count"]} - {getNapkinNameFromId(val["unique_id"])}
              </h4>
            );
          })}
        </div>

        <p>{props.job[9]}</p>
      </div>
    </div>
  );
}
