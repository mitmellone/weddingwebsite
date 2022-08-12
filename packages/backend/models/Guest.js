import mongoose from "mongoose";

export function initGuestModel(connection) {
  const modelName = "Guest";

  const schema = new mongoose.Schema({
    name: String,
    table: Number,
    artist: String,
  });

  schema.index({ name: 1 })

  connection.model(modelName, schema);
}
