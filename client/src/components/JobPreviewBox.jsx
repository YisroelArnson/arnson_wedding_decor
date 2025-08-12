import { React, useState } from "react";
import JobPage from "./JobPage";
export default function JobPreviewBox(props) {
  //Set class names based on job_type attribute from job
  let jobTypeStyles = "job-preview-box-container job-card ";
  if (props.job.job_type === "linen") jobTypeStyles += "linen-job-style";
  else if (props.job.job_type === "wedding") jobTypeStyles += "wedding-job-style";
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
  console.log(props.job);
  return (
    <div>
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
      <div onClick={() => setJobPageOpen(true)} className={jobTypeStyles}>
        <div className="job-card-header">
          <div className="job-title">{props.job.client_name}</div>
          <div className="job-tags">
            {props.job.job_type && <span className="tag">{props.job.job_type}</span>}
            {props.job.location && <span className="tag muted">{props.job.location}</span>}
          </div>
        </div>

        {!props.partialRender && (
          <div className="job-lines">
            {props.job.linen.map((linen, index) => (
              <div key={index} className="job-line">
                <span className="qty">{linen.count}</span>
                <span className="sep">×</span>
                <span className="item">{getLinenNameFromId(linen["unique_id"])}</span>
              </div>
            ))}

            {props.job.napkins.map((napkin, index) => (
              <div key={index} className="job-line napkin">
                <span className="qty">{napkin.count}</span>
                <span className="sep">×</span>
                <span className="item">{getNapkinNameFromId(napkin["unique_id"])}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
