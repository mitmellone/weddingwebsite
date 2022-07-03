import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppProviders, FindYourSeat, Home } from "./components";

function App() {
  return (
    <AppProviders>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="findYourSeat" element={<FindYourSeat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
