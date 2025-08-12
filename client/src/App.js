import { useState, useEffect } from "react";
import "./App.css";
import JobForm from "./components/JobForm";
import WeeklySchedule from "./components/WeeklySchedule";
import Calendar from "./components/Calendar";
import Table from "./components/Table";
import FlowerNotificationBox from "./components/FlowerNotificationBox";
import JobStats from "./components/JobStats";
import apiUrl from "./api_urls.json";
const API_BASE = apiUrl.api_url;
console.log(API_BASE);
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
        setLinenList(data);
        setLinenIsLoading(false);
        console.log(data);
      })
      .catch((err) => console.error("Error:", err));
  };
  //Fetches all napkin types from DB
  const getNapkins = () => {
    fetch(API_BASE + "/napkins")
      .then((res) => res.json())
      .then((data) => {
        setNapkinsList(data);
        console.log(data);
        setNapkinsIsLoading(false);
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="dashboard-root">
      <header className="app-header">
        <div className="brand">
          <div className="brand-mark">AWD</div>
          <div className="brand-text">
            <h1>Arnson Wedding Decor</h1>
            <p className="subtitle">Operations Dashboard</p>
          </div>
        </div>
        <div
          className="primary-button"
          onClick={() => {
            setJobFormModalActive(true);
          }}
        >
          + Add Job
        </div>
      </header>

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

      {jobIsLoading || linenIsLoading || napkinsIsLoading ? (
        <div className="loading-wrap">
          <div className="spinner" />
          <div>Loading data…</div>
        </div>
      ) : (
        <main className="content-grid">
          <section className="panel">
            <FlowerNotificationBox jobs={jobs} />
          </section>
          <section className="panel">
            <JobStats jobs={jobs} />
          </section>
          <section className="panel full">
            <WeeklySchedule
              jobs={jobs}
              linenList={linenList}
              napkinsList={napkinsList}
              fetchJobs={getJobs}
            />
          </section>
          <section className="panel full">
            <Calendar
              jobs={jobs}
              linenList={linenList}
              napkinsList={napkinsList}
              fetchJobs={getJobs}
            />
          </section>
          <section className="panel full">
            <Table
              data={jobs}
              linenList={linenList}
              napkinsList={napkinsList}
              fetchJobs={getJobs}
            />
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
