import React from 'react';
import {StoreState} from "../../../state/reducers";
import {connect} from "react-redux";
import {NewProductTag} from "../../../interfaces/productTag";
import {Card} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardRoot: {
            height: theme.spacing(35)
        }
    }),
);

interface Props {
    children?: React.ReactElement;
    newProductTag: NewProductTag;
}

const _NewPTOverview = (props: Props) => {
    const classes = useStyles();
    return (
        <Card className={classes.cardRoot}>
            <div>
                {JSON.stringify(props.newProductTag)}
            </div>
        </Card>

    );
};

const mapStateToProps = ({newProductTag}: StoreState) => {
    return {newProductTag};
};

export const NewPTOverview = connect(
    mapStateToProps,
    {}
)(_NewPTOverview);
