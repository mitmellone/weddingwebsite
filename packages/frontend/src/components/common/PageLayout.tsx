import { Container, ContainerProps, styled } from "@mui/material";
import { PropsWithChildren } from "react";

const StyledContainer = styled(Container)(({ theme }) => ({
  textAlign: "center",
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

export default function PageLayout({ children, ...props }: PropsWithChildren<ContainerProps>) {
  return (
    <StyledContainer maxWidth="lg" {...props}>
      {children}
    </StyledContainer>
  );
}
