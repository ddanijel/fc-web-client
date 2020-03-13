import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {Header} from "./ui/Header";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./ui/Theme";
import {makeStyles} from '@material-ui/core/styles';
import HomeScreen from "./screens/HomeScreen";
import ProducerAuth from "./screens/producer/auth/ProducerAuth";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from '@material-ui/core/Container';
import Footer from "./ui/Footer";
import {LoadingBackdrop} from "./ui/Backdrop";
import ProducerHomeScreen from "./screens/producer/ProducerHomeScreen";
import ProducerHomeScreen2 from "./screens/producer/ProducerHomeScreen2";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        // marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    }
}));


const App: React.FC = () => {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Container component="main" className={classes.main} maxWidth="sm">
                    <BrowserRouter>
                            <Header/>
                            <Switch>
                                <Route exact path="/" component={HomeScreen}/>
                                <Route exact path="/producer/auth" component={ProducerAuth}/>
                                <Route exact path="/producer" component={ProducerHomeScreen}/>
                                <Route exact path="/producer2" component={ProducerHomeScreen2}/>
                            </Switch>
                    </BrowserRouter>
                </Container>
                <Footer/>
                <LoadingBackdrop/>
            </ThemeProvider>
        </div>
    );
};

export default App;