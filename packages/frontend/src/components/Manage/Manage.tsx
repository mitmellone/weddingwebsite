import { useEffect, useState } from "react";
import { CircularProgress, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { getGuests, Guest } from "api";

export default function Manage() {
  const [guestList, setGuestList] = useState<Guest[]>([]);
  const [guestListLoading, setGuestListLoading] = useState(true);
  useEffect(() => {
    getGuests().then((guests) => {
      setGuestList(guests);
      setGuestListLoading(false);    
    })
  }, [])

  return (
    <>
      <GuestList guestList={guestList} guestListLoading={guestListLoading} />
      <NewGuestForm />
    </>
  );
}

function NewGuestForm() {
  const [name, setName] = useState("");
  const [tableNumber, setTableNumber] = useState(1);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField label="Name" value={name} onChange={(event) => setName(event.target.value)} />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Table"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          value={tableNumber}
          onChange={(event) => {
            setTableNumber(Number.parseInt(event.target.value, 10));
          }}
        />
      </Grid>
    </Grid>
  );
}

interface GuestListProps {
  guestList: Guest[];
  guestListLoading: boolean;
}

function GuestList({ guestList, guestListLoading }: GuestListProps) {

  if (guestListLoading) {
    return <CircularProgress />
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Table Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {guestList.map(({ name, tableNumber }) => (
            <TableRow >
              <TableCell>{name}</TableCell>
              <TableCell>{tableNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
