import React from "react";
import { useState, useEffect } from "react";
import LinenInput from "./LinenInput";
import NapkinInput from "./NapkinInput";
import CheckBox from "./CheckBox";
import apiUrl from "../api_urls.json";
const API_BASE = apiUrl.api_url;

export default function JobForm(props) {
  //job: state to store job info as its added
  const [job, setJob] = useState(props.job);
  console.log(job);
  //Updates specific job item state when user changes input fields
  const handleChange = (event) => {
    setJob({ ...job, [event.target.name]: event.target.value });
  };

  //Handles the option change when user clicks on an option
  const handleOptionChoice = (name, value) => {
    setJob({ ...job, [name]: value });
  };

  const addLinenInput = () => {
    let temp = job.linen;
    temp.push({ unique_id: "", count: 0 });
    setJob({ ...job, linen: temp });
  };

  const updateLinenInput = (index, unique_id, count) => {
    let temp = job.linen;
    temp[index] = { unique_id: unique_id, count: parseInt(count) };
    setJob({ ...job, linen: temp });
  };

  const removeLinenInput = (index) => {
    const next = job.linen.slice();
    next.splice(index, 1);
    setJob({ ...job, linen: next });
  };

  const addNapkinInput = () => {
    let temp = job.napkins;
    temp.push({ unique_id: "", count: 0 });
    setJob({ ...job, napkins: temp });
  };

  const updateNapkinInput = (index, unique_id, count) => {
    let temp = job.napkins;
    temp[index] = { unique_id: unique_id, count: parseInt(count) };
    setJob({ ...job, napkins: temp });
  };

  const removeNapkinInput = (index) => {
    const next = job.napkins.slice();
    next.splice(index, 1);
    setJob({ ...job, napkins: next });
  };

  //--------------------API-------------------------//
  //Sends a post request to /jobs; body is job state
  const saveJob = () => {
    if (job._id) {
      fetch(API_BASE + "/jobs/" + job._id, {
        method: "PUT",
        body: JSON.stringify(job),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          console.log(res);
          props.fetchJobs();
          props.setJobFormModalActive(false);
        })
        .catch((err) => console.error("Error:", err));
    } else {
      fetch(API_BASE + "/jobs", {
        method: "POST",
        body: JSON.stringify(job),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          console.log(res);
          props.fetchJobs();
          props.setJobFormModalActive(false);
        })
        .catch((err) => console.error("Error:", err));
    }
  };
  //--------------------API-------------------------//
  return (
    <div className="add-job-modal">
      <div className="add-job-modal-content">
        <div className="modal-header">
          <div>
            <h2>{job._id ? "Edit job" : "Add a new job"}</h2>
            <p className="small-text">Fill in the details below and save</p>
          </div>
          <button
            type="button"
            aria-label="Close"
            className="close-modal-button"
            onClick={() => {
              props.fetchJobs();
              props.setJobFormModalActive(false);
            }}
          >
            ×
          </button>
        </div>

        <div className="form-grid">
          <div className="form-section">
            <h3 className="section-title">Client details</h3>
            <label className="field">
              <span>Name</span>
              <input
                className="name-input"
                type="text"
                name="client_name"
                value={job.client_name}
                placeholder="Client name"
                onChange={handleChange}
              />
            </label>
            <label className="field">
              <span>Location</span>
              <input
                className="location-input"
                type="text"
                name="location"
                value={job.location}
                placeholder="Event location"
                onChange={handleChange}
              />
            </label>
            <label className="field">
              <span>Date</span>
              <input
                className="date-input"
                type="text"
                name="date"
                value={job.date}
                placeholder="YYYY-MM-DD"
                onChange={handleChange}
              />
            </label>
            <div className="inline-checks">
              <CheckBox
                checked={job.bouqette}
                title={"bouqette"}
                attribute_id={"bouqette"}
                onChangeFunction={handleChange}
              />
              <CheckBox
                checked={job.order_flowers}
                title={"Order Flowers"}
                attribute_id={"order_flowers"}
                onChangeFunction={handleChange}
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Event type</h3>
            <div className="options-group">
              <div
                className={
                  job.job_type == "linen" ? "option picked-option" : "option"
                }
                type="option"
                name="job_type"
                value={"linen"}
                placeholder="Type of Event"
                onClick={() => handleOptionChoice("job_type", "linen")}
              >
                Linen
              </div>
              <div
                className={
                  job.job_type == "wedding"
                    ? "option picked-option"
                    : "option"
                }
                type="option"
                name="job_type"
                value={"wedding"}
                placeholder="Type of Event"
                onClick={() => handleOptionChoice("job_type", "wedding")}
              >
                Wedding
              </div>
            </div>

            <h3 className="section-title">Client type</h3>
            <div className="options-group">
              <div
                className={
                  job.client_type == "customer"
                    ? "option picked-option"
                    : "option"
                }
                type="option"
                name="client_type"
                value={"customer"}
                placeholder="Type of Event"
                onClick={() => handleOptionChoice("client_type", "customer")}
              >
                Customer
              </div>
              <div
                className={
                  job.client_type == "vendor" ? "option picked-option" : "option"
                }
                type="option"
                name="client_type"
                value={"vendor"}
                placeholder="Type of Event"
                onClick={() => handleOptionChoice("client_type", "vendor")}
              >
                Vendor
              </div>
            </div>

            <label className="field">
              <span>Client Email</span>
              <input
                className="client-email-input"
                type="text"
                name="client_email"
                value={job.client_email}
                placeholder="client@email.com"
                onChange={handleChange}
              />
            </label>
            <label className="field">
              <span>Deposit Amount</span>
              <input
                type="number"
                name="deposit_amount_recieved"
                value={job.deposit_amount_recieved}
                placeholder="$300"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        <div className="form-grid form-grid-items">
          <div className="form-section">
            <h3 className="section-title">Linen</h3>
            <div className="line-item-table">
              <div className="line-item-header">
                <span>Item</span>
                <span>Qty</span>
              </div>
              <div id="linen-container">
                {job.linen.length != 0
                  ? job.linen.map((linen, index) => {
                      return (
                        <LinenInput
                          linen={linen}
                          index={index}
                          key={index}
                          linenList={props.linenList}
                          updateLinenInput={updateLinenInput}
                          removeRow={removeLinenInput}
                        />
                      );
                    })
                  : addLinenInput()}
              </div>
            </div>
            <div
              className="add-linen-button"
              onClick={() => {
                addLinenInput();
              }}
            >
              + Add linen
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Napkins</h3>
            <div className="line-item-table">
              <div className="line-item-header">
                <span>Item</span>
                <span>Qty</span>
              </div>
              <div id="napkin-container">
                {job.napkins.length != 0
                  ? job.napkins.map((napkin, index) => {
                      return (
                        <NapkinInput
                          napkin={napkin}
                          index={index}
                          key={index}
                          napkinsList={props.napkinsList}
                          updateNapkinInput={updateNapkinInput}
                          removeRow={removeNapkinInput}
                        />
                      );
                    })
                  : addNapkinInput()}
              </div>
            </div>
            <div
              className="add-napkin-button"
              onClick={() => {
                addNapkinInput();
              }}
            >
              + Add Napkin
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Notes</h3>
          <textarea
            className="notes-input-box"
            type="text"
            name="notes"
            value={job.notes}
            placeholder="Notes..."
            onChange={handleChange}
          />
        </div>

        <div className="modal-footer">
          <button
            className="secondary-button"
            onClick={() => {
              props.setJobFormModalActive(false);
            }}
          >
            Cancel
          </button>
          <button
            className="primary-button"
            onClick={() => {
              saveJob();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
