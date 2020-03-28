import React from 'react';
import {StoreState} from "../../../state/reducers";
import {connect} from "react-redux";
import {INewProductTag} from "../../../interfaces/ProductTag";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import useWindowDimensions from "../../ui/hooks/useWindowDimensions";
import {ProductTagDetails} from "../../fragments/ProductTagDetails";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardRoot: {
            height: theme.spacing(35)
        }
    }),
);

interface Props {
    children?: React.ReactElement;
    newProductTag: INewProductTag;
}

const _NewPTOverview = (props: Props) => {
    const classes = useStyles();
    const {height} = useWindowDimensions();

    return (
        <ProductTagDetails productTag={props.newProductTag}/>
    );
};

const mapStateToProps = ({newProductTag}: StoreState) => {
    return {newProductTag};
};

export const NewPTOverview = connect(
    mapStateToProps,
    {}
)(_NewPTOverview);
