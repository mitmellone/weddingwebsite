import { ThemeProvider } from "@mui/material";
import { PropsWithChildren } from "react";

import { weddingTheme } from "./WeddingTheme";

export default function AppProviders({ children }: PropsWithChildren) {
  return <ThemeProvider theme={weddingTheme}>{children}</ThemeProvider>;
}
