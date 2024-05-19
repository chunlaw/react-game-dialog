import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import { PlayArrow } from "@mui/icons-material";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const Playground = () => {
  const { content, setContent, openDialog, closeDialog } = useContext(AppContext);

  const [doc, setDoc] = useState<string>("")

  useEffect(() => {
    fetch('/doc.md')
      .then(r => r.text())
      .then(r => setDoc(r))
  }, [])

  useEffect(() => {
    const haltDialog = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        closeDialog()
      }
    }
    window.addEventListener("keydown", haltDialog)
    return () => {
      window.removeEventListener("keydown", haltDialog)
    }
  }, [closeDialog])

  return (
    <Box flex={1} display="flex" width="100%" gap={2} overflow="hidden">
      <Box flex={1} display="flex" flexDirection="column" py={1} gap={1}>
        <Box alignSelf="flex-start">
          <Button
            variant="outlined"
            startIcon={<PlayArrow />}
            onClick={openDialog}
          >
            Run
          </Button>
        </Box>
        <TextField 
          multiline
          fullWidth
          placeholder="Dialog in markdown format"
          sx={{
            flex: 1,
            overflow: 'hidden',
            "& .MuiInputBase-root": {
              flex: 1,
              height: "100%",
              alignItems: 'flex-start',
              "& textarea": {
                overflow: 'scroll !important',
                flex: 1,
                maxHeight: '100%',
                scrollbarWidth: "none",
              }
            }
          }}
          value={content}
          onChange={({target: { value }}) => setContent(value)}
          size="small"
        />
      </Box>
      <Box flex={1} overflow="scroll" height="100%" sx={{"& *": {userSelect: "text"}}}>
        <Markdown rehypePlugins={[rehypeRaw]}>
          {doc}
        </Markdown>
      </Box>
    </Box>
  );
};

export default Playground;
