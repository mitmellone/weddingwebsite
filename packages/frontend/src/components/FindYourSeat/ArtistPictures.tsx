import { useCallback, useState } from "react";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import { MobileStepper, Button, Typography } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import SwipaebleViews from "react-swipeable-views";

const images = [
  { artist: "Anderson .Paak", img: "images/anderson_paak.png" },
  { artist: "Avi Kaplan", img: "images/avi_kaplan.png" },
  { artist: "Childish Gambino", img: "images/childish_gambino.png" },
  { artist: "Delta Rae", img: "images/delta_rae.png" },
  { artist: "Ella Fitzgerald", img: "images/ella_fitzgerald.png" },
  { artist: "FINNEAS", img: "images/finneas.png" },
  { artist: "Foo Fighters", img: "images/foo_fighters.png" },
  { artist: "Lauryn Hill", img: "images/lauryn_hill.png" },
  { artist: "Lizzo", img: "images/lizzo.png" },
  { artist: "Dwayne Johnson", img: "images/moana.png" },
  { artist: "Psy", img: "images/psy.png" },
  { artist: "Queen", img: "images/queen.png" },
  { artist: "Red Hot Chili Peppers", img: "images/red_hot_chili_peppers.png" },
  { artist: "Ripe", img: "images/ripe.png" },
  { artist: "The Black Keys", img: "images/the_black_keys.png" },
  { artist: "The Rolling Stones", img: "images/the_rolling_stones.png" },
];

interface ArtistPicturesProps extends BoxProps {
  targetArtist: string;
}

export default function ArtistPictures({ targetArtist, ...boxProps }: ArtistPicturesProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [selectionState, setSelectionState] = useState<"CORRECT" | "INCORRECT" | "UNSELECTED">(
    "UNSELECTED",
  );
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    setSelectionState("UNSELECTED");
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
    setSelectionState("UNSELECTED");
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
    setSelectionState("UNSELECTED");
  };

  const onImageClick = useCallback(
    (artist: string) => {
      if (artist === targetArtist) {
        setSelectionState("CORRECT");
      } else {
        setSelectionState("INCORRECT");
      }
    },
    [targetArtist],
  );

  return (
    <Box {...boxProps}>
      <SwipaebleViews index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
        {images.map((step, index) => (
          <div key={step.artist}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                {...(selectionState === "CORRECT" && { border: "3px solid green" })}
                {...(selectionState === "INCORRECT" && { border: "3px solid red" })}
                component="img"
                height={150}
                src={step.img}
                onClick={() => onImageClick(step.artist)}
              />
            ) : null}
          </div>
        ))}
      </SwipaebleViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
      {selectionState === "CORRECT" ? (
        <Typography variant="h6" color="success.main">
          You got it! Your table will have this picture on it.
        </Typography>
      ) : (
        selectionState === "INCORRECT" && (
          <Typography variant="h6" color="error">
            Try again.
          </Typography>
        )
      )}
    </Box>
  );
}
