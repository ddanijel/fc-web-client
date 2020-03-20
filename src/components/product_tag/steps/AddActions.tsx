import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {StoreState} from "../../../state/reducers";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Controller, useForm} from "react-hook-form";
import {NewProductTag, ProductTagAction} from "../../../interfaces/productTag";
import {CardContent} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import {addActionToNewProductTag, toggleActionOfNewProductTag} from "../../../state/actions/newProductTag";
import CardActions from "@material-ui/core/CardActions";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        actionForm: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        cardRoot: {
            height: theme.spacing(35),
            overflow: "auto"
        },
        cardActions: {
            justifyContent: 'center'
        }
    }),
);

interface Props {
    children?: React.ReactElement;
    newProductTag: NewProductTag;
    addActionToNewProductTag: typeof addActionToNewProductTag;
    toggleActionOfNewProductTag: typeof toggleActionOfNewProductTag;
}

const _AddActions = (props: Props) => {
    const classes = useStyles();
    const {handleSubmit, control, reset} = useForm<ProductTagAction>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.toggleActionOfNewProductTag({
            name: event.target.name,
            selected: event.target.checked
        });
    };

    const handleAddAction = handleSubmit(({name}) => {
        props.addActionToNewProductTag({
            name,
            selected: true
        });
        reset();
    });

    return (
        <Card className={classes.cardRoot}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Product Actions
                </Typography>
                <FormGroup style={{
                    height: "100%",
                    display: 'block',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <List>
                        {props.newProductTag.actions.map((action, index) => (
                            <FormControlLabel key={index}
                                              control={<Switch checked={action.selected} onChange={handleChange}
                                                               name={action.name}/>}
                                              label={action.name}
                            />
                        ))}
                    </List>
                </FormGroup>

            </CardContent>
            <CardActions className={classes.cardActions}>
                <form className={classes.actionForm} onSubmit={handleAddAction}>
                    <Controller
                        name="name"
                        as={
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                size={"small"}
                                // fullWidth
                                id="name"
                                label="Action Name"
                                name="name"
                                autoFocus
                            />}
                        control={control}
                        defaultValue=""
                    />
                    <Button type="submit"
                        // fullWidth
                            variant="contained"
                            color="primary"
                    >
                        Add
                    </Button>
                </form>
            </CardActions>
        </Card>
    );
};

const mapStateToProps = ({newProductTag}: StoreState) => {
    return {newProductTag};
};

export const AddActions = connect(
    mapStateToProps,
    {
        addActionToNewProductTag,
        toggleActionOfNewProductTag
    }
)(_AddActions);
