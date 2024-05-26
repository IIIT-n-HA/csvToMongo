// file for setting up the schema to retreive data from csv file into mongoDB.
const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
  user_id: String,
  utc_time: Date,
  operation: String,
  market: String,
  buy_sell_amount: Number,
  price: Number,
});

const Trade = mongoose.model("Trade", tradeSchema);

module.exports = Trade;
