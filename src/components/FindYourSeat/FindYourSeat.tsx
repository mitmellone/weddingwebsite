import { Autocomplete, TextField, Typography } from "@mui/material";
import { useState } from "react";

// todo fetch from api
const names = ["Steve Mellone", "Lisa Mellone", "Neal Mathes", "Mary Farahmand"];

export default function FindYourSeat() {
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <Typography variant="h3" align="center" color="primary" gutterBottom>
        Find your seat
      </Typography>
      <Autocomplete<string>
        value={selectedName}
        onChange={(_, newValue) => setSelectedName(newValue)}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
        options={names}
        fullWidth
        open
        renderInput={(params) => <TextField {...params} label="Select your name" />}
      />
    </>
  );
}
