import { Container, SxProps } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Theme } from "@emotion/react";
import GameDialog from "../GameDialog";
import { useContext, useMemo } from "react";
import AppContext from "../../AppContext";

const Layout = () => {
  const { content, open, closeDialog } = useContext(AppContext)

  const dialogs = useMemo(() => {
    if ( open === false ) {
      return []
    }
    return content.split("<--->")
  }, [content, open])

  return (
    <Container fixed maxWidth="xl" sx={rootSx}>
      <Header />
      <Outlet />
      <Footer />
      <GameDialog
        open={dialogs.length > 0}
        onClose={closeDialog}
        dialogues={dialogs}
      />
    </Container>
  );
};

export default Layout;

const rootSx: SxProps<Theme> = {
  height: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  px: 2,
};
