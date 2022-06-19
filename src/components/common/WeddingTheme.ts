import { createTheme,ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#867267',
    },
    secondary: {
      main: '#79a38b',
    },
    background: {
      default: '#efebe9',
    },
    info: {
      main: '#677b86',
    },
  },
  typography: {
    fontFamily: 'Lora',
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        option: ({ theme }) => ({
          ":not(&:last-child)": {
            borderBottom: `1px solid ${theme.palette.divider}`
          }
        }),
      }
    }
  }
};

export const weddingTheme = createTheme(themeOptions);