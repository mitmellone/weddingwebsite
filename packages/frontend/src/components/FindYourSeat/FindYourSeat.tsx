import { Autocomplete, TextField, Typography } from "@mui/material";
import { getGuests, Guest } from "api";
import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";

// todo move to server maybe

export default function FindYourSeat() {
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  const [guestSearchResults, setGuestSearchResults] = useState<Guest[]>([]);

  return (
    <>
      <Typography variant="h3" align="center" color="primary" gutterBottom>
        Find your seat
      </Typography>
      <Autocomplete<Guest>
        onChange={(_, newValue) => setSelectedGuest(newValue)}
        onInputChange={(_, inputValue) =>
          getGuests({ nameQuery: inputValue }).then(setGuestSearchResults)
        }
        options={guestSearchResults}
        fullWidth
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} value={selectedGuest?.name} label="Select your name" />
        )}
        filterOptions={(x) => x}
      />
      {selectedGuest && (
        <>
          <Typography variant="h6" sx={{ mt: 4 }}>
            Can you name this artist?
          </Typography>
          <ReactAudioPlayer controls src="https://docs.google.com/uc?export=download&id=1lJT1DRj_5G9ZuaWWRx4F6iZ1JP6VKdQ0-" />
        </>
      )}
    </>
  );
}
