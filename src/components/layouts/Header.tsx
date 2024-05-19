import { Box, IconButton, Typography } from "@mui/material";
import { GitHub as GitHubIcon } from "@mui/icons-material";
import npmLogo from "../../assets/npm.svg";


const Header = () => {
  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <Typography variant="h4">React Game Dialog</Typography>
      <Box display="flex" gap={1}>
        <IconButton
          onClick={() => window.open('https://github.com/chunlaw/react-game-dialog')}
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            window.open(
              "https://www.npmjs.com/package/react-game-dialog",
              "_blank"
            );
          }}
          size="small"
        >
          <img src={npmLogo} width={24} height={24} alt="NPM logo" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
