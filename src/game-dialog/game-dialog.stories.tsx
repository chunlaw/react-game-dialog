import React, { useState } from "react";
import GameDialog from "./index";
import { Button, CssBaseline, ThemeProvider, createTheme } from "@mui/material"

export default {
  title: "GameDialog",
}

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const GameDialogPrimary = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button onClick={() => setOpen(true)} variant="contained">Open</Button>
      <GameDialog
        open={open}
        onClose={() => setOpen(false)}
        dialogues={[
          "### Peter\n\nHello, Amy!",
          "### Amy\n<!-- __ALIGN_RIGHT__ -->\n\nHow are you, Peter!",
        ]}
        characterUrls={{
          "Peter": "/assets/peter.png",
          "Amy": "assets/amy.png",
        }}
      />
    </ThemeProvider>
  )
}