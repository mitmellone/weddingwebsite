import { initGuestModel } from "./Guest.js";
import { initTableModel } from "./Table.js";

export function initializeModels(connection) {
  initGuestModel(connection);
  initTableModel(connection);
}