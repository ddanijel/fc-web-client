import { createMuiTheme } from '@material-ui/core/styles';

const black = "#000000";
const archBlue = "#0B72B9";

const theme = createMuiTheme({
    palette: {
        // type: "dark",
        common: {
            black: `${black}`,
            arcBlue: `${archBlue}`,
        },
        primary: {
            main: `${black}`
        },
        secondary: {
            main: `${archBlue}`
        }
    },
    typography: {
        h5: {
            fontWeight: 700
        }
    }
});

export default theme;