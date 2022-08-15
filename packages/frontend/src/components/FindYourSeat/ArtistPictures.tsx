import { useState } from "react";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import { MobileStepper, Button } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import SwipaebleViews from "react-swipeable-views";

const images = [
  {
    artist: "Red Hot Chili Peppers",
    img: "redHotChiliPeppers.jpg",
  },
  {
    artist: "The Black Keys",
    img: "theBlackKeys.jpg",
  },
];

interface ArtistPicturesProps extends BoxProps {
  onImageClick: (artist: string) => void;
}

export default function ArtistPictures({ onImageClick, ...boxProps }: ArtistPicturesProps) {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box {...boxProps}>
      <SwipaebleViews index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
        {images.map((step, index) => (
          <div key={step.artist}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
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
    </Box>
  );
}
