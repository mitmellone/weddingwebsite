import mongoose from "mongoose";

export function initTableModel(connection) {
  const modelName = "Table";

  const schema = new mongoose.Schema({
    tableNumber: Number,
    artist: String,
  });

  connection.model(modelName, schema);
}
