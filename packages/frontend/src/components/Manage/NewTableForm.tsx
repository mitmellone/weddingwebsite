import { GridProps, Grid, TextField, Button } from "@mui/material";
import { TableCreatePayload } from "api";
import { useState, FormEventHandler } from "react";

interface NewTableFormProps extends GridProps<"form"> {
  createNewTable: (newGuest: TableCreatePayload) => void;
}

export default function NewTableForm({ createNewTable, ...gridContainerProps }: NewTableFormProps) {
  const [artist, setArtist] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    createNewTable({ artist, tableNumber: Number.parseInt(tableNumber, 10) });
    setArtist("");
    setTableNumber("");
  };

  return (
    <Grid {...gridContainerProps} container spacing={2} component="form" onSubmit={onSubmit}>
      <Grid item xs={3}>
        <TextField
          label="Table Number"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          value={tableNumber}
          onChange={(event) => {
            setTableNumber(event.target.value);
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Artist Name"
          value={artist}
          onChange={(event) => setArtist(event.target.value)}
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
