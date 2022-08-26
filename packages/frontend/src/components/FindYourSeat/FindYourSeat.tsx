import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { getGuests, Guest } from "api";
import { useEffect, useMemo, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import throttle from "lodash/throttle";
import AnswerBox from "./AnswerBox";
import ArtistPictures from "./ArtistPictures";

const GET_GUEST_LIMIT = 5;

export default function FindYourSeat() {
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  const [guestSearchResults, setGuestSearchResults] = useState<Guest[]>([]);

  const searchForGuests = useMemo(
    () =>
      throttle(
        (nameQuery) => getGuests({ nameQuery, limit: GET_GUEST_LIMIT }).then(setGuestSearchResults),
        500,
      ),
    [],
  );

  useEffect(() => {
    getGuests({ limit: 5 }).then(setGuestSearchResults);
  }, []);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const correctAnswer = selectedGuest?.artist === userAnswer;

  const [showHintButton, setShowHintButton] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  useEffect(() => {
    if (selectedGuest) {
      setShowHintButton(false);
      setTimeout(() => {
        setShowHintButton(true);
      }, 30000); // 30 seconds
    }
  }, [selectedGuest]);

  return (
    <>
      <Typography variant="h3" align="center" color="primary" gutterBottom>
        Find your seat
      </Typography>
      <Autocomplete<Guest>
        onChange={(_, newValue) => setSelectedGuest(newValue)}
        onInputChange={(_, inputValue) => searchForGuests(inputValue)}
        options={guestSearchResults}
        fullWidth
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} value={selectedGuest?.name} label="Enter your name" />
        )}
        filterOptions={(x) => x}
        isOptionEqualToValue={(option, value) => option._id === value._id}
      />
      {selectedGuest && (
        <>
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Can you name the artist who plays this song?
          </Typography>
          <ReactAudioPlayer
            controls
            autoPlay
            src={`${selectedGuest.artist?.replaceAll(" ", "_").toLowerCase()}.mp3`}
          />
          <AnswerBox
            label="Your answer"
            value={userAnswer}
            onChange={(_, newValue) => setUserAnswer(newValue || "")}
            sx={{ my: 2 }}
          />
          {correctAnswer ? (
            <Typography variant="h6" color="success.main">
              {usedHint
                ? "This is the artist who plays that song."
                : "You are right! That is the artist who is playing this song"}
            </Typography>
          ) : (
            !!userAnswer &&
            !correctAnswer && (
              <Typography variant="h6" color="error">
                That's not quite it
              </Typography>
            )
          )}
          {showHintButton && !correctAnswer && (
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => {
                setUserAnswer(selectedGuest.artist || "");
                setUsedHint(true);
              }}
            >
              Need a hint?
            </Button>
          )}
          {correctAnswer && (
            <>
              <Typography variant="body1">
                So you know the artist's name, but what do they look like?
                <br />
                Swipe through the photos below and tap on the one that looks like them.
              </Typography>
              <ArtistPictures sx={{ mt: 2 }} targetArtist={selectedGuest.artist || ""} />
            </>
          )}
        </>
      )}
    </>
  );
}
