import { useState, useEffect } from "react";
import "./App.css";
import JobForm from "./components/JobForm";
import WeeklySchedule from "./components/WeeklySchedule";
import Calendar from "./components/Calendar";
import Table from "./components/Table";
const API_BASE = "http://localhost:3001";
function App() {
  //Store list of all jobs fetched from DB
  const [jobs, setJobs] = useState([]);

  //State to open and close add job model
  const [JobFormModalActive, setJobFormModalActive] = useState(false);

  //State to display app when data is done loading
  const [jobIsLoading, setJobIsLoading] = useState(true);
  const [linenIsLoading, setLinenIsLoading] = useState(true);
  const [napkinsIsLoading, setNapkinsIsLoading] = useState(true);

  //List of all tableclothes that we have
  const [linenList, setLinenList] = useState();
  //List of all napkins that we have
  const [napkinsList, setNapkinsList] = useState([]);

  useEffect(() => {
    getJobs();
    getLinen();
    getNapkins();
  }, []);
  //Fetches all jobs from DB
  const getJobs = () => {
    console.log("fetching");
    fetch(API_BASE + "/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setJobIsLoading(false);
        console.log(data);
      })
      .catch((err) => console.error("Error:", err));
  };
  //Fetches all linen types from DB
  const getLinen = () => {
    fetch(API_BASE + "/linen")
      .then((res) => res.json())
      .then((data) => {
        setLinenList(data.data.values);
        setLinenIsLoading(false);
        console.log(data.data.values);
      })
      .catch((err) => console.error("Error:", err));
  };
  //Fetches all napkin types from DB
  const getNapkins = () => {
    fetch(API_BASE + "/napkins")
      .then((res) => res.json())
      .then((data) => {
        setNapkinsList(data.data.values);
        console.log(data.data.values);
        setNapkinsIsLoading(false);
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div>
      {jobIsLoading || linenIsLoading || napkinsIsLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="App">
          {/* {jobs.map((job) => (
            <div key={job.job_id}>{job}</div>
          ))} */}

          <div
            className="openModalButton"
            onClick={() => {
              setJobFormModalActive(true);
            }}
          >
            Add Job
          </div>

          {JobFormModalActive ? (
            <JobForm
              jobs={jobs}
              setJobs={setJobs}
              job={{ linen: [], napkins: [] }}
              setJobFormModalActive={setJobFormModalActive}
              fetchJobs={getJobs}
              linenList={linenList}
              napkinsList={napkinsList}
            />
          ) : (
            ""
          )}

          <WeeklySchedule
            jobs={jobs}
            linenList={linenList}
            napkinsList={napkinsList}
            fetchJobs={getJobs}
          />
          <Calendar
            jobs={jobs}
            linenList={linenList}
            napkinsList={napkinsList}
            fetchJobs={getJobs}
          />
          <Table
            data={jobs}
            linenList={linenList}
            napkinsList={napkinsList}
            fetchJobs={getJobs}
          />
        </div>
      )}
    </div>
  );
}

export default App;
