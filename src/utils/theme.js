import { createTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

const theme = createTheme({
  palette: {
    background:{
        primary: '#EA7C69',
        secondary: '#1F1D2B',
        tertiary: '#393C49'
    },
    text:{
        primary: '#EA7C69',
        white: '#fff',
        grey: '##ABBBC2',
        preparing: '#9290FE',
        complete: '#50D1AA',
        pending: '#FFB572'
    },
    action:{
        preparing: 'rgba(146, 144, 254, 0.20)',
        complete: 'rgba(107, 226, 190, 0.24)',
        pending: 'rgba(255, 181, 114, 0.20)'
    },
    status:{

    }
  },
  typography: {
    fontFamily: 'Barlow',
    fontWeight: {
      tableTitle: '600'
    },
    fontSize: {
      tableTitle: "1.5rem",
      icon: "1.5rem"
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '--TextField-brandBorderColor': '#fff',
          '--TextField-brandBorderHoverColor': '#EA7C69',
          '--TextField-brandBorderFocusedColor': '#EA7C69',
          '& label.Mui-focused': {
            color: 'var(--TextField-brandBorderFocusedColor)',
          },
          '& label':{
            color: 'var(--TextField-brandBorderColor)',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:before': {
            borderBottom: '2px solid var(--TextField-brandBorderColor)',
          },
          '&:hover:not(.Mui-disabled, .Mui-error):before': {
            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
          },
          '&.Mui-focused:after': {
            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: 'var(--TextField-brandBorderColor)',
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--TextField-brandBorderHoverColor)',
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--TextField-brandBorderFocusedColor)',
          },
        },
      },
    },
  }
});

export default theme;
