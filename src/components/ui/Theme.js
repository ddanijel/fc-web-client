import { createMuiTheme } from '@material-ui/core/styles';

const archBlue = "#0B72B9";
const archOrange = "#FFBA60";

const theme = createMuiTheme({
    palette: {
        common: {
            arcBlue: `${archBlue}`,
            arcOrange: `${archOrange}`
        },
        primary: {
            main: `${archBlue}`
        },
        secondary: {
            main: `${archOrange}`
        }
    },
    typography: {
        h5: {
            fontWeight: 700
        }
    }
});

export default theme;