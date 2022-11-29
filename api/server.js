const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

const jobsSpreadsheetId = "156oHYxDbV0vsJGF-zltaVzT-y_VA5YSxdgpJH-NCJgo";

//Create auth instance
const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

// app.get("/", async (req, res) => {
//   //Create client instance for auth
//   const client = await auth.getClient();

//   //Instance of google sheets api
//   const googleSheets = google.sheets({ version: "v4", auth: client });

//   //get metadata about spreadsheet
//   const metadata = await googleSheets.spreadsheets.get({
//     auth,
//     spreadsheetId: jobsSpreadsheetId,
//   });

//   res.send(getRows.data);
// });

//Fetch all rows from Jobs spreadsheet
app.get("/jobs", async (req, res) => {
  //Create client instance for auth
  const client = await auth.getClient();

  //Instance of google sheets api
  const googleSheets = google.sheets({ version: "v4", auth: client });

  //Read rows from spreadsheet "Jobs"
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId: jobsSpreadsheetId,
    range: "jobs",
  });

  res.send(getRows);
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

app.post("/jobs", async (req, res) => {
  console.log(req.body);
  //Create client instance for auth
  const client = await auth.getClient();

  //Instance of google sheets api
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId: jobsSpreadsheetId,
    range: "jobs",
  });

  const currentId = parseInt(getRows.data.values.slice(-1)[0][0]) + 1;
  //Append row(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId: jobsSpreadsheetId,
    //Adding a new row to the next open row, and only in columns A and B
    range: "jobs",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        [
          currentId,
          req.body.name,
          req.body.date,
          req.body.location,
          req.body.type_of_event,
          req.body.linen,
          req.body.napkins,
          req.body.flowers,
          req.body.bouqette,
          req.body.notes,
          req.body.paid,
          req.body.send_invoice,
          req.body.client_email,
          req.body.type_of_client,
        ],
      ],
    },
  });
  res.sendStatus(200);
});

app.post("/jobs/:id", async (req, res) => {
  //Create client instance for auth
  const client = await auth.getClient();
  var foundItemToUpdate = false;
  //Instance of google sheets api
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId: jobsSpreadsheetId,
    range: "jobs",
  });

  for (var i = 1; i < getRows.data.values.length; i++) {
    if (getRows.data.values[i][0] == req.params.id) {
      foundItemToUpdate = true;
      await googleSheets.spreadsheets.values.update({
        auth,
        spreadsheetId: jobsSpreadsheetId,
        //Adding a new row to the next open row, and only in columns A and B
        range: "jobs!A" + (i + 1) + ":Z" + (i + 1),
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [
            [
              req.body.id,
              req.body.name,
              req.body.date,
              req.body.location,
              req.body.type_of_event,
              req.body.linen,
              req.body.flowers,
              req.body.Bouqette,
              req.body.Notes,
              req.body.paid,
              req.body.send_invoice,
              req.body.client_email,
              req.body.type_of_client,
            ],
          ],
        },
      });
    }
  }
  if (!foundItemToUpdate) {
    console.error("Error: could not find ID: " + req.params.id);
    res.status(500).send("Error: could not find ID: " + req.params.id);
  }
});
app.listen(3001, () => console.log("Port 3001"));
