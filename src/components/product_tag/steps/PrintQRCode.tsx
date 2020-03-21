import React from 'react';
import useWindowDimensions from "../../ui/hooks/useWindowDimensions";
import {Card} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardRoot: {
            overflow: "auto"
        }
    }),
);

const PrintQrCode = () => {
    const classes = useStyles();
    const {height} = useWindowDimensions();

    return (
        <Card style={{
            height: height - 300
        }} className={classes.cardRoot}>
            <div>
                Print
            </div>
        </Card>
    );
};

export default PrintQrCode;