import React from "react";
import { useState, useEffect } from "react";
import LinenInput from "./LinenInput";
import NapkinInput from "./NapkinInput";

const API_BASE = "http://localhost:3001";

export default function JobForm(props) {
  //LinenCount: how many linen input boxes to display
  const [linenCount, setLinenCount] = useState(1);
  //NapkinCount: ''
  const [napkinCount, setNapkinCount] = useState(1);
  //job: state to store job info as its added
  const [job, setJob] = useState(props.job);
  console.log(job);
  //List of table clothes added by form
  const [linen, setLinen] = useState();
  //List of napkins added by form
  const [napkins, setNapkins] = useState();
  //Add linen and napkin states to job state
  const addLinenAndNapkingsToJob = () => {
    setJob({
      ...job,
      linen: JSON.stringify(linen),
      napkins: JSON.stringify(napkins),
    });
  };

  //Adds linen to linen state when user changes drop down or count inputs
  const addLinen = (index, newObj) => {
    console.log(newObj);
    let tempLinen = linen;
    let itemFound = false;
    for (const key in linen) {
      if (linen[key].index === index) {
        itemFound = true;
        linen[key] = newObj;
      }
    }

    if (!itemFound) {
      setLinen({ ...linen, [index]: newObj });
    } else {
      setLinen(tempLinen);
    }
  };

  //Adds napkin to napkin state when user changes drop down or count inputs
  const addNapkins = (index, newObj) => {
    let tempNapkins = napkins;
    let itemFound = false;
    for (const key in napkins) {
      if (napkins[key].index === index) {
        itemFound = true;
        napkins[key] = newObj;
      }
    }

    if (!itemFound) {
      setNapkins({ ...napkins, [index]: newObj });
    } else {
      setNapkins(tempNapkins);
    }

    addLinenAndNapkingsToJob();
  };

  useEffect(() => {
    addLinenAndNapkingsToJob();
    console.log(linen);
    console.log(napkins);
  }, [linen, napkins]);

  //Updates specific job item state when user changes input fields
  const handleChange = (event) => {
    setJob({ ...job, [event.target.name]: event.target.value });
    console.log(job);
  };

  //Handles the option change when user clicks on an option
  const handleOptionChoice = (name, value) => {
    setJob({ ...job, [name]: value });
  };

  //Adds linen input field
  const addLinenInput = () => {
    setLinenCount(linenCount + 1);
  };
  //Adds Napkin input field
  const addNapkinInput = () => {
    setNapkinCount(napkinCount + 1);
  };

  //--------------------API-------------------------//
  //Sends a post request to /jobs; body is job state
  const postJob = () => {
    addLinenAndNapkingsToJob();
    console.log(job);
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
  };
  //--------------------API-------------------------//

  return (
    <div className="add-job-modal">
      <div className="add-job-modal-content">
        <div
          className="closeModalButton"
          onClick={() => {
            props.setJobFormModalActive(false);
          }}
        >
          x
        </div>
        <h3 className="title">Name</h3>
        <input
          className="name-input"
          type="text"
          name="name"
          value={job.name}
          placeholder="Name"
          onChange={handleChange}
        ></input>
        <h3 className="title">Location</h3>
        <input
          className="location-input"
          type="text"
          name="location"
          value={job.location}
          placeholder="Location"
          onChange={handleChange}
        ></input>
        <h3 className="title">Date</h3>
        <input
          className="date-input"
          type="text"
          name="date"
          value={job.date}
          placeholder="date"
          onChange={handleChange}
        ></input>
        <h3 className="title">type of event</h3>
        <div
          className="option"
          type="option"
          name="type_of_event"
          value={"linen"}
          placeholder="Type of Event"
          onClick={() => handleOptionChoice("type_of_event", "linen")}
        >
          Linen
        </div>
        <div
          className="option"
          type="option"
          name="type_of_event"
          value={"linen"}
          placeholder="Type of Event"
          onClick={() => handleOptionChoice("type_of_event", "wedding")}
        >
          Wedding
        </div>
        <div id="linen-container">
          {Array.from(Array(linenCount)).map((x, index) => (
            <LinenInput
              index={index}
              key={index}
              addLinen={addLinen}
              linenList={props.linenList}
            />
          ))}
        </div>
        <div
          className="add-linen-button"
          onClick={() => {
            addLinenInput();
          }}
        >
          Add linen
        </div>
        <div id="napkin-container">
          {Array.from(Array(napkinCount)).map((x, index) => (
            <NapkinInput
              index={index}
              key={index}
              napkinsList={props.napkinsList}
              addNapkins={addNapkins}
            />
          ))}
        </div>
        <div
          className="add-napkin-button"
          onClick={() => {
            addNapkinInput();
          }}
        >
          Add Napkin
        </div>
        <h3 className="type-of-client-title">type of client</h3>
        <div
          className="option"
          type="option"
          name="type_of_client"
          value={"customer"}
          placeholder="Type of Event"
          onClick={() => handleOptionChoice("type_of_client", "customer")}
        >
          Customer
        </div>
        <div
          className="option"
          type="option"
          name="type_of_client"
          value={"vendor"}
          placeholder="Type of Event"
          onClick={() => handleOptionChoice("type_of_client", "vendor")}
        >
          Vendor
        </div>
        <h3 className="title">Client Email</h3>
        <input
          className="client-email-input"
          type="text"
          name="client_email"
          value={job.client_email}
          placeholder="Client Email"
          onChange={handleChange}
        ></input>
        <h3 className="title">Notes</h3>
        <textarea
          className="notes-input-box"
          type="text"
          name="notes"
          value={job.notes}
          placeholder="Notes..."
          onChange={handleChange}
        />
        <div
          className="save-button"
          onClick={() => {
            postJob();
          }}
        >
          Save
        </div>
      </div>
    </div>
  );
}
