import { React, useState } from "react";

export default function JobPage(props) {
  const linen = JSON.parse(props.job[5]);
  const napkins = JSON.parse(props.job[6]);
  const linenValues = Object.values(linen);
  const napkinsValues = Object.values(napkins);

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
    <div className="job-page-modal">
      <div className="job-page-content">
        <h2 onClick={() => props.setJobPageOpen(false)}>x</h2>
        <h1>{props.job[1]}</h1>
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
    </div>
  );
}
