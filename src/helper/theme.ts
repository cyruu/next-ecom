import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        thumb: {
          transition: "none", // Remove thumb animation
          "&:focus, &:hover, &$active": {
            boxShadow: "none", // Remove focus/hover effect
          },
        },
        track: {
          transition: "none", // Remove track animation
        },
      },
    },
  },
});
