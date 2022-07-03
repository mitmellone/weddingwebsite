import { Autocomplete, TextField, Typography, styled } from "@mui/material";
import { useState } from "react";

// todo fetch from api
const names = ["Steve Mellone", "Lisa Mellone", "Neal Mathes", "Mary Farahmand"];
const data = [
  {
    name: "Steve Mellone",
    table: 1,
    artist: "The Black Keys",
    videoEmbedId: "6yCIDkFI7ew",
  },
  {
    name: "Lisa Mellone",
    table: 1,
    artist: "The Black Keys",
    videoEmbedId: "6yCIDkFI7ew",
  },
  {
    name: "Neal Mathes",
    table: 1,
    artist: "Ripe",
    videoEmbedId: "gmE-33ZGOfg",
  },
  {
    name: "Mary Farahmand",
    table: 1,
    artist: "FINNEAS",
    videoEmbedId: "VaKzNtwPQxE",
  },
];

function getDataForName(nameQuery: string) {
  return data.find(({ name }) => name === nameQuery);
}

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
        renderInput={(params) => <TextField {...params} label="Select your name" />}
      />
      {selectedName && <YoutubeVideo embedId={getDataForName(selectedName)?.videoEmbedId} />}
    </>
  );
}

interface YoutubeVideoProps {
  embedId?: string;
}

const VideoResponsiveContainer = styled("div")(({ theme }) => ({
  overflow: "hidden",
  paddingBottom: theme.spacing(2),
  position: "relative",
  display: "flex",
  height: 360,
  marginTop: theme.spacing(2),
  "& iframe": {
    left: 0,
    top: 0,
    paddingTop: 120,
    border: "none",
    marginTop: -60,
    height: "100%",
    width: "100%",
    position: "absolute",
  },
}));

function YoutubeVideo({ embedId }: YoutubeVideoProps) {
  if (!embedId) {
    return <Typography variant="body1">Who are you?</Typography>;
  }
  return (
    <VideoResponsiveContainer>
      <Typography variant="h5">Can you name the artist?</Typography>
      <iframe
        width="360"
        height="360"
        src={`https://www.youtube.com/embed/${embedId}?modestbranding=1&autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="Do you know the artist?"
      />
    </VideoResponsiveContainer>
  );
}
