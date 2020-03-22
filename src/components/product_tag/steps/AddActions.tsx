import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Controller, useForm} from "react-hook-form";
import {INewProductTagAction, IProductTagAction} from "../../../interfaces/ProductTag";
import {CardContent} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import useWindowDimensions from "../../ui/hooks/useWindowDimensions";
import AddIcon from '@material-ui/icons/Add';

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
            overflow: "auto"
        },
        cardActions: {
            justifyContent: 'center'
        }
    }),
);

interface Props {
    currentActions: INewProductTagAction[];
    addAction: Function;
    toggleAction: Function;
}

const AddActions = (props: Props) => {
    const classes = useStyles();
    const {handleSubmit, control, reset} = useForm<IProductTagAction>();
    const {height} = useWindowDimensions();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.toggleAction({
            name: event.target.name,
            selected: event.target.checked
        });
    };

    const handleAddAction = handleSubmit(({name}) => {
        if (!props.currentActions.some(action => action.name === name)) {
            props.addAction({
                name,
                selected: true
            });
            reset();
        }
    });

    return (
        <Card style={{
            height: height - 300
        }} className={classes.cardRoot}>
            <CardContent style={{
                height: "80%"
            }}>
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
                        {props.currentActions.map((action, index) => (
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
                                color="secondary"
                                size={"small"}
                                id="name"
                                label="Action Name"
                                name="name"
                                autoFocus
                            />}
                        control={control}
                        defaultValue=""
                    />
                    <Button type="submit"
                            variant="contained"
                            color="secondary"
                            endIcon={<AddIcon/>}
                    >
                        Add
                    </Button>
                </form>
            </CardActions>
        </Card>
    );
};

// const mapStateToProps = ({newProductTag}: StoreState) => {
//     return {newProductTag};
// };

// export const AddActions = connect(
//     mapStateToProps,
//     {
//         addActionToNewProductTag,
//         toggleActionOfNewProductTag
//     }
// )(_AddActions);

export default AddActions;