import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import {
  createGuest,
  createTable,
  getGuests,
  getTables,
  Guest,
  GuestCreatePayload,
  Table as SeatingTable,
  TableCreatePayload,
} from "api";
import TableList from "./TableList";
import GuestList from "./GuestList";
import NewGuestForm from "./NewGuestForm";
import NewTableForm from "./NewTableForm";

export default function Manage() {
  const [guestList, setGuestList] = useState<Guest[]>([]);
  const [guestListLoading, setGuestListLoading] = useState(true);

  const [tableList, setTableList] = useState<SeatingTable[]>([]);
  const [tableListLoading, setTableListLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    getGuests({ limit: 200 }).then(
      (guests) => {
        setGuestList(guests);
        setGuestListLoading(false);
      },
      (error) => {
        setErrorMessage(error);
        setGuestListLoading(false);
      },
    );

    getTables().then(
      (tables) => {
        setTableList(tables);
        setTableListLoading(false);
      },
      (error) => {
        setErrorMessage(error);
        setTableListLoading(false);
      },
    );
  }, []);

  const createNewGuest = async (newGuest: GuestCreatePayload) => {
    await createGuest(newGuest);
    getGuests({ limit: 200 }).then(setGuestList, setErrorMessage);
  };

  const createNewTable = async (newTable: TableCreatePayload) => {
    await createTable(newTable);
    getTables().then(setTableList, setErrorMessage);
  };

  return (
    <>
      <TableList
        tableList={tableList}
        tableListLoading={tableListLoading}
        onUpdateTable={() => getTables().then(setTableList, setErrorMessage)}
      />
      <NewTableForm createNewTable={createNewTable} sx={{ py: 4 }} />
      <GuestList
        guestList={guestList}
        guestListLoading={guestListLoading}
        onUpdateGuest={() => getGuests({ limit: 200 }).then(setGuestList, setErrorMessage)}
      />
      <NewGuestForm createNewGuest={createNewGuest} tables={tableList} sx={{ pt: 4 }} />
      {errorMessage && <Typography variant="body1">Error: {errorMessage}</Typography>}
    </>
  );
}
