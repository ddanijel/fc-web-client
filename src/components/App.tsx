import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {Header} from "./ui/Header";
import {ThemeProvider} from "@material-ui/styles";
import theme from "./ui/Theme";
import FoodChainDetails from "./fragments/FoodChainDetails";
import HomeScreen from "./screens/HomeScreen";
import ProducerAuth from "./screens/producer/ProducerAuth";


const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route exact path="/" component={HomeScreen}/>
                    <Route exact path="/producer" component={ProducerAuth}/>
                </Switch>

            </BrowserRouter>
            <FoodChainDetails/>
        </ThemeProvider>
    );
};

export default App;