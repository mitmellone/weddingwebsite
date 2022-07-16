import { Container, styled } from "@mui/material";
import { PropsWithChildren } from "react";

const StyledContainer = styled(Container)(({ theme }) => ({
  textAlign: "center",
  margin: theme.spacing(4, 0),
}));

export default function PageLayout({ children }: PropsWithChildren<{}>) {
  return <StyledContainer maxWidth="sm">{children}</StyledContainer>;
}
