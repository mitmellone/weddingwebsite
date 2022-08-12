import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { getGuests, Guest } from "api";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";

// todo move to server maybe

export default function FindYourSeat() {
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  const [guestSearchResults, setGuestSearchResults] = useState<Guest[]>([]);

  const [showHintButton, setShowHintButton] = useState(false);
  useEffect(() => {
    if (selectedGuest) {
      setShowHintButton(false);
      setTimeout(() => {
        setShowHintButton(true);
      }, 10000);
    }
  }, [selectedGuest]);

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
        isOptionEqualToValue={(option, value) => option._id === value._id }
      />
      {selectedGuest && (
        <>
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Can you name this artist?
          </Typography>
          <ReactAudioPlayer controls autoPlay src={selectedGuest.artist === "The Black Keys" ? "blackkeys.mp3" : "redHotChiliPeppers.mp3"} />
          {showHintButton && (
            <Button variant="contained" sx={{ mt: 2 }}>Need a hint?</Button>
          )}
        </>
      )}
    </>
  );
}
