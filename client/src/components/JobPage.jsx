import { React, useState } from "react";

export default function JobPage(props) {
  const [jobFormOpen, setJobFormOpen] = useState(false)
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
      <div className="job-page-content">
        <div className="job-page-top-bar">
          <h1>Name of client: {props.job[1]}</h1>
          <div className="top-bar-right">
            <div className="job-page-edit-button" onClick={}>Edit</div>
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
