// file for creating controller functions to deal with api calls.
const Trade = require("./schema.js");
const csvParser = require("csv-parser");
const fs = require("fs");

// function for uploading the file on api call.
const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const trades = []; // Array to store parsed trade data

  try {
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on("data", (row) => {
        // Parse each row and create a Trade model instance
        const trade = new Trade({
          user_id: row["User_ID"], // Access data by header names
          utc_time: new Date(row["UTC_Time"]), // Convert to Date object
          operation: row["Operation"],
          market: row["Market"],
          buy_sell_amount: Number(row["Buy/Sell Amount"]), // Convert to number
          price: Number(row["Price"]),
        });
        trades.push(trade);
      })
      .on("end", async () => {
        try {
          // Save all parsed trade data to the database at once
          await Trade.insertMany(trades);
          res.status(200).send("Data uploaded successfully.");
        } catch (err) {
          console.error("Error saving trade data:", err);
          res.status(500).send("Error uploading data.");
        }
      });
  } catch (err) {
    console.error("Error reading CSV file:", err);
    res.status(500).send("Error uploading data.");
  }
};

// function for getting the details on api call.
const getFileDetails = async (req, res) => {
  try {
    const trades = await Trade.find();
    res.status(200).json(trades);
  } catch (err) {
    res.status(500).send("Error retrieving trades data.");
  }
};

module.exports = { uploadFile, getFileDetails };
