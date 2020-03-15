import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CameraIcon from '@material-ui/icons/Camera';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';
import theme from "../../ui/Theme";
import {Link} from "react-router-dom";
import {routePaths} from "../../../global/constants";

const useStyles = makeStyles({
    root: {
        // width: 500,
    },
    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        marginLeft: theme.spacing(-2)
        // backgroundColor: "#8e9d90",
        // marginBottom: theme.spacing(2.5),
    }
});

const ProducerBottomTagNavigation = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.stickToBottom}
        >
            <BottomNavigationAction component={Link} to={routePaths.createProductTag} label="New PT"
                                    icon={<CameraIcon/>}/>
            <BottomNavigationAction component={Link} to={routePaths.producerHistoryPage} label="History"
                                    icon={<HistoryIcon/>}/>
            <BottomNavigationAction component={Link} to={routePaths.producerSettings} label="Settings"
                                    icon={<SettingsIcon/>}/>
        </BottomNavigation>
    );
};

export default ProducerBottomTagNavigation;