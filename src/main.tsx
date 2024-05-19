import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { AppContextProvider } from "./AppContext";

const theme = createTheme({
  palette: {
    mode: "dark",
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <CssBaseline />
        <App />
      </AppContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
