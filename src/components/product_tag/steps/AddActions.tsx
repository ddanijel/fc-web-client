import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {StoreState} from "../../../state/reducers";
import {connect} from "react-redux";
import {toggleDrawer} from "../../../state/actions";
import TextField from "@material-ui/core/TextField";

const _AddActions = ({newProductTag}) => {
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: true,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <FormGroup>
            {newProductTag.actions.map((action, index) => (
                <FormControlLabel  key={index}
                    control={<Switch checked={action.selected} onChange={handleChange} name="checkedA" />}
                    label={action.name}
                />
            ))}


            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="actionName"
                label="Action Name"
                name="actionName"
                autoFocus
            />

        </FormGroup>
    );
};

const mapStateToProps = ({newProductTag}: StoreState) => {
    return {newProductTag};
};

export const AddActions = connect(
    mapStateToProps,
    {toggleDrawer}
)(_AddActions);
