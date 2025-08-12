import { React, useState } from "react";
import JobForm from "./JobForm";
import CheckBox from "./CheckBox";
import apiUrl from "../api_urls.json";
const API_BASE = apiUrl.api_url;

export default function JobPage(props) {
  const [jobFormOpen, setJobFormOpen] = useState(false);
  const jobDate = new Date(props.job.date);
  let linen_total_price = 0;
  let napkin_total_price = 0;
  const handleCheckBoxChange = (event) => {
    fetch(API_BASE + "/jobs/attribute/" + props.job._id, {
      method: "PUT",
      body: JSON.stringify({
        attribute: event.target.name,
        value: event.target.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        console.log(res);
        props.fetchJobs();
      })
      .catch((err) => console.error("Error:", err));
  };

  const getLinenNameFromId = (id) => {
    for (let i = 0; i < props.linenList.length; i++) {
      if (props.linenList[i][1] === id) {
        return {
          linen_name: props.linenList[i][0],
          client_price: props.linenList[i][6],
          vendor_price: props.linenList[i][7],
        };
      }
    }
  };

  const getNapkinNameFromId = (id) => {
    for (let i = 0; i < props.napkinsList.length; i++) {
      if (props.napkinsList[i][1] === id) {
        return {
          napkin_name: props.napkinsList[i][0],
          client_price: props.napkinsList[i][5],
          vendor_price: props.napkinsList[i][6],
        };
      }
    }
  };

  const createInvoice = () => {
    fetch(API_BASE + "/invoice", {
      method: "POST",
      body: JSON.stringify({ id: props.job._id, title: "invoice_" }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        console.log(res.status);
        // This code is for when I have a send invoice button
        // if (res.ok) {
        //   handleCheckBoxChange({
        //     target: { name: "sent_invoice", value: true },
        //   });
        // }
      })
      .catch((err) => console.error("Error:", err));
  };
  // Build sheet-style rows
  const linenRows = props.job.linen
    .map((linen) => {
      const data = getLinenNameFromId(linen.unique_id);
      if (!data) return null;
      const unit = props.job.client_type === "vendor" ? data.vendor_price : data.client_price;
      const subtotal = unit * linen.count;
      linen_total_price += subtotal;
      return { name: data.linen_name, qty: linen.count, unit, subtotal };
    })
    .filter(Boolean);

  const napkinRows = props.job.napkins
    .map((napkin) => {
      const data = getNapkinNameFromId(napkin.unique_id);
      if (!data) return null;
      const unit = props.job.client_type === "vendor" ? data.vendor_price : data.client_price;
      const subtotal = unit * napkin.count;
      napkin_total_price += subtotal;
      return { name: data.napkin_name, qty: napkin.count, unit, subtotal };
    })
    .filter(Boolean);

  const grandTotal = (linen_total_price + napkin_total_price).toFixed(2);

  return (
    <div className="job-page-modal">
      {jobFormOpen ? (
        <JobForm
          job={props.job}
          setJobFormModalActive={setJobFormOpen}
          linenList={props.linenList}
          napkinsList={props.napkinsList}
          fetchJobs={props.fetchJobs}
        />
      ) : (
        ""
      )}
      <div className="job-page-content">
        <div className="modal-header">
          <div>
            <h2>Job: {props.job.client_name}</h2>
            <p className="small-text">{jobDate.toDateString()} • {props.job.location}</p>
          </div>
          <div className="top-bar-right">
            <button className="secondary-button" onClick={() => setJobFormOpen(true)}>Edit</button>
            <button className="primary-button" onClick={() => createInvoice()}>Create Invoice</button>
            <button className="close-modal-button" onClick={() => props.setJobPageOpen(false)} aria-label="Close">×</button>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-section">
            <h3 className="section-title">Status</h3>
        <CheckBox
          checked={props.job.sent_invoice}
          title={"sent invoice"}
          attribute_id={"sent_invoice"}
          onChangeFunction={handleCheckBoxChange}
        />
        <CheckBox
          checked={props.job.paid}
          title={"paid"}
          attribute_id={"paid"}
          onChangeFunction={handleCheckBoxChange}
        />
        <CheckBox
          checked={props.job.linen_picked_up}
          title={"Linen picked up"}
          attribute_id={"linen_picked_up"}
          onChangeFunction={handleCheckBoxChange}
        />
          </div>
          <div className="form-section">
            <h3 className="section-title">Details</h3>
            <div className="kv-list">
              <div className="kv-row">
                <div className="kv-key">Job ID</div>
                <div className="kv-value">{props.job.job_id}</div>
              </div>
              <div className="kv-row">
                <div className="kv-key">Client type</div>
                <div className="kv-value">{props.job.client_type}</div>
              </div>
              <div className="kv-row">
                <div className="kv-key">Client email</div>
                <div className="kv-value">
                  <a href={`mailto:${props.job.client_email}`}>{props.job.client_email}</a>
                </div>
              </div>
              <div className="kv-row">
                <div className="kv-key">Deposit received</div>
                <div className="kv-value">${props.job.deposit_amount_recieved}</div>
              </div>
              <div className="kv-row">
                <div className="kv-key">Bouqette</div>
                <div className="kv-value">{props.job.bouqette ? "Yes" : "No"}</div>
              </div>
              <div className="kv-row">
                <div className="kv-key">Order flowers</div>
                <div className="kv-value">{props.job.order_flowers ? "Yes" : "No"}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-grid form-grid-items">
          <div className="form-section">
            <h3 className="section-title">Linen</h3>
            <table className="sheet-table">
              <thead>
                <tr>
                  <th className="left">Item</th>
                  <th className="num">Qty</th>
                  <th className="num">Unit</th>
                  <th className="num">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {linenRows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="left">{row.name}</td>
                    <td className="num">{row.qty}</td>
                    <td className="num">${row.unit}</td>
                    <td className="num">${row.subtotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="left bold">Linen total</td>
                  <td className="num bold">${linen_total_price.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="form-section">
            <h3 className="section-title">Napkins</h3>
            <table className="sheet-table">
              <thead>
                <tr>
                  <th className="left">Item</th>
                  <th className="num">Qty</th>
                  <th className="num">Unit</th>
                  <th className="num">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {napkinRows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="left">{row.name}</td>
                    <td className="num">{row.qty}</td>
                    <td className="num">${row.unit}</td>
                    <td className="num">${row.subtotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="left bold">Napkins total</td>
                  <td className="num bold">${napkin_total_price.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Grand total</h3>
          <h2>${grandTotal}</h2>
        </div>

        <div className="form-section">
          <h3 className="section-title">Notes</h3>
        <p>{props.job.notes}</p>
        </div>

        <div className="form-section invoice-link-container">
          {props.job.invoice_ids != 0 ? (
            props.job.invoice_ids.map((id, index) => {
              let link =
                "https://docs.google.com/spreadsheets/d/" +
                props.job.invoice_ids[props.job.invoice_ids.length - index - 1];
              return (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={link}
                  className="invoice-link"
                >
                  Invoice #{props.job.invoice_ids.length - index}
                </a>
              );
            })
          ) : (
            <h3>There are no invoice created for this job yet</h3>
          )}
        </div>
      </div>
    </div>
  );
}
