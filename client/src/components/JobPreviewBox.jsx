import { React, useState } from "react";
import JobPage from "./JobPage";
export default function JobPreviewBox(props) {
  const linen = JSON.parse(props.job[5]);
  const napkins = JSON.parse(props.job[6]);
  const linenValues = Object.values(linen);
  const napkinsValues = Object.values(napkins);

  const [jobPageOpen, setJobPageOpen] = useState(false);
  const getLinenNameFromId = (id) => {
    for (let i = 0; i < props.linenList.length; i++) {
      if (props.linenList[i][1] === id) {
        return props.linenList[i][0];
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
    <div className="job-preview-box-container">
      {jobPageOpen ? (
        <JobPage
          job={props.job}
          linenList={props.linenList}
          napkinsList={props.napkinsList}
          setJobPageOpen={setJobPageOpen}
          fetchJobs={props.fetchJobs}
        />
      ) : (
        ""
      )}

      <div>
        <h3>{props.job[1]}</h3>
        <h4
          className="open-job-page-button"
          onClick={() => setJobPageOpen(true)}
        >
          +
        </h4>
      </div>
      {linenValues.map((val) => {
        return (
          <h4>
            {val["count"]} - {getLinenNameFromId(val["unique_id"])}
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
  );
}
