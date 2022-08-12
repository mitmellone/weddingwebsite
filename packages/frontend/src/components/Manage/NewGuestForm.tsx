import { GridProps, Grid, TextField, Button, MenuItem } from "@mui/material";
import { GuestCreatePayload, Table as SeatingTable } from "api";
import { useState, FormEventHandler } from "react";

interface NewGuestFormProps extends GridProps<"form"> {
  createNewGuest: (newGuest: GuestCreatePayload) => void;
  tables: SeatingTable[];
}

export default function NewGuestForm({
  createNewGuest,
  tables,
  ...gridContainerProps
}: NewGuestFormProps) {
  const [name, setName] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const table = Number.parseInt(tableNumber, 10);
    const selectedTable = tables.find(({ tableNumber: tn }) => tn === table);
    createNewGuest({ name, table, artist: selectedTable?.artist });
    setName("");
    setTableNumber("");
  };

  return (
    <Grid {...gridContainerProps} container spacing={2} component="form" onSubmit={onSubmit}>
      <Grid item xs={7}>
        <TextField
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          select
          label="Table"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          value={tableNumber}
          onChange={(event) => {
            setTableNumber(event.target.value);
          }}
          fullWidth
        >
          {tables.map(({ tableNumber: tableNumberOption }) => (
            <MenuItem key={tableNumberOption} value={tableNumberOption}>
              {tableNumberOption}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={3}>
        <Button type="submit" variant="outlined">
          Create
        </Button>
      </Grid>
    </Grid>
  );
}
