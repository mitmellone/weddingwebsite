import { Container, styled } from "@mui/material";
import { PropsWithChildren } from "react";

export default function PageLayout({ children }: PropsWithChildren<{}>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const StyledContainer = styled(Container)(({ theme }) => ({
    textAlign: "center",
    margin: theme.spacing(4, 0),
  }));

  return <StyledContainer maxWidth="sm">{children}</StyledContainer>;
}
