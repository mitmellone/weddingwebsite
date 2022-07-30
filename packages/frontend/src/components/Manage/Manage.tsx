import { FormEventHandler, useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { createGuest, deleteGuest, getGuests, Guest, GuestCreatePayload } from "api";

export default function Manage() {
  const [guestList, setGuestList] = useState<Guest[]>([]);
  const [guestListLoading, setGuestListLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    getGuests().then(
      (guests) => {
        setGuestList(guests);
        setGuestListLoading(false);
      },
      (error) => {
        setErrorMessage(error);
        setGuestListLoading(false);
      },
    );
  }, []);

  const createNewGuest = async (newGuest: GuestCreatePayload) => {
    await createGuest(newGuest);
    getGuests().then(setGuestList, setErrorMessage);
  };

  return (
    <>
      <GuestList
        guestList={guestList}
        guestListLoading={guestListLoading}
        onUpdateGuest={() => getGuests().then(setGuestList, setErrorMessage)}
      />
      <NewGuestForm createNewGuest={createNewGuest} />
      {errorMessage && <Typography variant="body1">Error: {errorMessage}</Typography>}
    </>
  );
}

interface NewGuestFormProps {
  createNewGuest: (newGuest: GuestCreatePayload) => void;
}

function NewGuestForm({ createNewGuest }: NewGuestFormProps) {
  const [name, setName] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    createNewGuest({ name, table: Number.parseInt(tableNumber, 10) });
    setName("");
    setTableNumber("");
  };

  return (
    <Grid sx={{ paddingTop: 2 }} container spacing={2} component="form" onSubmit={onSubmit}>
      <Grid item xs={6}>
        <TextField
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Table"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          value={tableNumber}
          onChange={(event) => {
            setTableNumber(event.target.value);
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <Button type="submit" variant="outlined">
          Create
        </Button>
      </Grid>
    </Grid>
  );
}

interface GuestListProps {
  guestList: Guest[];
  guestListLoading: boolean;
  onUpdateGuest: () => void;
}

function GuestList({ guestList, guestListLoading, onUpdateGuest }: GuestListProps) {
  if (guestListLoading) {
    return <CircularProgress />;
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Table Number</TableCell>
            <TableCell>Artist</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {guestList.map(({ _id, name, table, artist }) => (
            <TableRow key={_id}>
              <TableCell>{name}</TableCell>
              <TableCell>{table}</TableCell>
              <TableCell>{artist}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => {
                    deleteGuest(_id);
                    onUpdateGuest();
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
