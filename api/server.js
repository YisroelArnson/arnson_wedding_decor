const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
const { mongoose } = require("mongoose");
const app = express();
const uri =
  "mongodb+srv://yaffa:yaffa_database@cluster0.3x1cb0l.mongodb.net/?retryWrites=true&w=majority";
app.use(express.json());
app.use(cors());

const jobsSpreadsheetId = "156oHYxDbV0vsJGF-zltaVzT-y_VA5YSxdgpJH-NCJgo";

//Create auth instance
const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

const Job = require("./models/Job");

//Fetch all jobs
app.get("/jobs", async (req, res) => {
  const jobs = await Job.find();

  res.json(jobs);
});

const pruneEmptyLinenAndNapkins = (items) => {
  let temp = [];
  for (let i = 0; i < items.length; i++) {
    if (items[i].unique_id != "" && items[i].count != 0) {
      temp.push(items[i]);
    }
  }
  return temp;
};

//Add a new job
app.post("/jobs", async (req, res) => {
  const jobs = await Job.find();

  greatestId = "-1";
  console.log(jobs);
  for (i = 0; i < jobs.length; i++) {
    if (parseInt(jobs[i].job_id) >= parseInt(greatestId)) {
      greatestId = jobs[i].job_id;
      console.log(greatestId);
    }
  }
  const job = new Job({
    job_id: (parseInt(greatestId) + 1).toString(),
    client_name: req.body.client_name,
    date: req.body.date,
    location: req.body.location,
    job_type: req.body.job_type,
    linen: await pruneEmptyLinenAndNapkins(req.body.linen),
    napkins: await pruneEmptyLinenAndNapkins(req.body.napkins),
    flowers: req.body.flowers,
    bouqette: req.body.bouqette,
    notes: req.body.notes,
    paid: req.body.paid,
    sent_invoice: req.body.sent_invoice,
    client_email: req.body.client_email,
    client_type: req.body.client_type,
    invoice_url: req.body.invoice_url,
    linen_picked_up: req.body.linen_picked_up,
  });

  job.save();
  console.log("Saved document: ", job);

  res.json(job);
});

//Delete specific document by ID
app.delete("/jobs/:id", async (req, res) => {
  const result = await Job.findByIdAndDelete(req.params.id);

  res.json(result);
});

//Deletes all entries
app.delete("/jobs", async (req, res) => {
  const result = await Job.remove({});

  res.json(result);
});

//Update an existing job by replacing the document with the request body.
app.put("/jobs/:id", async (req, res) => {
  const job = await Job.findOneAndUpdate(
    { _id: req.params.id },
    {
      ...req.body,
      linen: pruneEmptyLinenAndNapkins(req.body.linen),
      napkins: pruneEmptyLinenAndNapkins(req.body.napkins),
    },
    {
      new: true,
    }
  );
  console.log("Updated document: ", job);
  res.json(job);
});

//To change a specific attribute of a job. Id is from param and attribute is from body
app.put("/jobs/attribute/:id", async (req, res) => {
  const job = await Job.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: { [req.body.attribute]: req.body.value },
    },
    {
      new: true,
    }
  );
  console.log("Updated document: ", job);
  res.json(job);
});

//Fetch all rows from Linen spreadsheet
app.get("/linen", async (req, res) => {
  //Create client instance for auth
  const client = await auth.getClient();

  //Instance of google sheets api
  const googleSheets = google.sheets({ version: "v4", auth: client });

  //Read rows from spreadsheet "Linen"
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId: jobsSpreadsheetId,
    range: "linen",
  });

  res.send(getRows);
});

//Fetch all rows from Napkins spreadsheet
app.get("/napkins", async (req, res) => {
  //Create client instance for auth
  const client = await auth.getClient();

  //Instance of google sheets api
  const googleSheets = google.sheets({ version: "v4", auth: client });

  //Read rows from spreadsheet "Napkins"
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId: jobsSpreadsheetId,
    range: "napkins",
  });

  res.send(getRows);
});

app.listen(3001, () => console.log("Port 3001"));
