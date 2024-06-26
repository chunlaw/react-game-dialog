import {
  Box,
  Collapse,
  Container,
  Modal,
  Paper,
  SxProps,
  Theme,
} from "@mui/material";
import throttle from "lodash.throttle";
import { useEffect, useMemo, useRef, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";

export interface GameDialogProps {
  open: boolean;
  onClose: () => void;
  dialogues: string[];
}

const GameDialog = ({
  open,
  onClose,
  dialogues,
}: GameDialogProps) => {
  const [page, setPage] = useState<number>(0);
  const variables = useRef<Record<string, boolean>>({});

  const nextPage = useMemo(
    () =>
      throttle((dialogues: string[]) => {
        setPage((prev) => {
          let ret = prev + 1;
          while (ret < dialogues.length) {
            const condition = dialogues[ret].match(
              /<!-- CONDITION (.*?) (TRUE|FALSE) -->/
            );
            if (condition === null) return ret;
            if (variables.current[condition[1]] && condition[2] === "TRUE") {
              return ret;
            }
            if (!variables.current[condition[1]] && condition[2] === "FALSE") {
              return ret;
            }
            ++ret;
          }
          return ret;
        });
      }, 500),
    []
  );

  const characters = useMemo(
    () =>
      dialogues.map((v) => {
        const avatar = (v.match(/<!-- AVATAR (.*?) -->/) ?? [])[1];
        const character = v.split("\n")[0].replace(/#/g, "").trim();
        const align = v.match(/<!-- AVATAR_ALIGN_RIGHT -->/g) ? "flex-end" : "flex-start";
        return {
          avatar,
          character,
          align,
        };
      }),
    [dialogues]
  );

  useEffect(() => {
    // reset when the dialogue is done
    if (page && page >= dialogues.length) {
      onClose();
      variables.current = JSON.parse(JSON.stringify({}));
      setPage(0);
    } else if (dialogues.length) {
      const prompt = dialogues[page].match(/<!-- PROMPT (.*?): (.*) -->/);
      if (prompt !== null) {
        const timer = setTimeout(() => {
          if (variables.current[prompt[0]] === undefined) {
            variables.current[prompt[1]] = window.confirm(prompt[2]);
          }
        }, 200);
        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [page, onClose, dialogues, nextPage]);

  return (
    <>
      {dialogues.map((dialogue, idx) => (
        <Modal
          key={`dialogue-00-${idx}`}
          open={page >= idx && open}
          onClose={() => nextPage(dialogues)}
        >
          <Container
            sx={rootSx}
            fixed
            maxWidth="md"
            onClick={() => nextPage(dialogues)}
          >
            <Box
              sx={{
                backgroundImage: `url(${characters[idx].avatar})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                height: "min(45dvh, 45dvw, 400px)",
                width: "min(45dvh, 45dvw, 400px)",
                alignSelf: characters[idx].align,
                backgroundPosition: characters[idx].align === "flex-start" ? "left" : "right",
              }}
            />
            <Paper square={false} elevation={16} sx={dialogSx}>
              <Collapse in={true}>
                <Box display="flex" flexDirection="column">
                  <Markdown rehypePlugins={[rehypeRaw]}>
                    {dialogue}
                  </Markdown>
                  <Box sx={blinkingIconSx}>
                    <ArrowDropDownIcon />
                  </Box>
                </Box>
              </Collapse>
            </Paper>
          </Container>
        </Modal>
      ))}
    </>
  );
};

export default GameDialog;

const rootSx: SxProps<Theme> = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  bottom: 0,
  left: 0,
  right: 0,
  mb: 2,
};

const dialogSx: SxProps<Theme> = {
  px: 3,
  minHeight: 150,
};

const blinkingIconSx: SxProps<Theme> = {
  alignSelf: "flex-end",
  animation: "blinking-animation 1s ease-in-out infinite",
  "@keyframes blinking-animation": {
    "50%": {
      opacity: 0,
    },
  },
};
