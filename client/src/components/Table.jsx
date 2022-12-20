import { useEffect } from "react";
import { React, useState, useCallback } from "react";
import JobPage from "./JobPage";

export default function Table({ data, linenList, napkinsList, fetchJobs }) {
  const [sortKey, setSortKey] = useState("job_id");
  const [sortOrder, setSortOrder] = useState("ascn");
  const [jobPageOpen, setJobPageOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState();
  const headers = [
    { key: "job_id", label: "ID" },
    { key: "date", label: "Date" },
    { key: "client_name", label: "Name" },
    { key: "location", label: "Location" },
    { key: "client_email", label: "Email" },
    { key: "sent_invoice", label: "Invoice sent?" },
    { key: "paid", label: "Recieved payment?" },
    { key: "linen_picked_up", label: "Linen picked up?" },
  ];

  function sortData(tableData, sortKey, reverse) {
    if (!sortKey) return tableData;

    const sortedData = data.sort((a, b) => {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    });

    if (reverse) {
      return sortedData.reverse();
    }

    return sortedData;
  }

  function findById(source, id) {
    for (var i = 0; i < source.length; i++) {
      if (source[i]._id === id) {
        return source[i];
      }
    }
    throw "Couldn't find object with id: " + id;
  }

  const sortedData = useCallback(
    () => sortData(data, sortKey, sortOrder === "desc"),
    [data, sortKey, sortOrder]
  );

  const changeSort = (key) => {
    console.log(key);
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");
    setSortKey(key);
  };
  function SortButton({ sortOrder, columnKey, sortKey, onClick }) {
    return (
      <button
        onClick={onClick}
        className={`${
          sortKey === columnKey && sortOrder === "desc"
            ? "sort-button sort-reverse"
            : "sort-button"
        }`}
      >
        ▲
      </button>
    );
  }

  return (
    <div>
      {jobPageOpen ? (
        <JobPage
          job={findById(data, selectedJobId)}
          linenList={linenList}
          napkinsList={napkinsList}
          setJobPageOpen={setJobPageOpen}
          fetchJobs={fetchJobs}
        />
      ) : (
        ""
      )}
      <table>
        <thead>
          <tr>
            {headers.map((row) => {
              return (
                <td key={row.key}>
                  {row.label}
                  <SortButton
                    columnKey={row.key}
                    onClick={() => changeSort(row.key)}
                    sortOrder={sortOrder}
                    sortKey={sortKey}
                  />
                </td>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {sortedData().map((job) => {
            return (
              <tr
                key={job.job_id}
                onClick={() => {
                  console.log(job._id);
                  setSelectedJobId(job._id);
                  setJobPageOpen(true);
                }}
              >
                <td>{job.job_id}</td>
                <td>{job.date}</td>
                <td>{job.client_name}</td>
                <td>{job.location}</td>
                <td>{job.client_email}</td>
                <td>{job.sent_invoice ? "✅" : "❌"}</td>
                <td>{job.paid ? "✅" : "❌"}</td>
                <td>{job.linen_picked_up ? "✅" : "❌"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
