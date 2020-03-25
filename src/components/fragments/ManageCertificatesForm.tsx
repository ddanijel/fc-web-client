import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Controller, useForm} from "react-hook-form";
import {IProductTagAction} from "../../interfaces/ProductTag";
import {CardContent} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import useWindowDimensions from "../ui/hooks/useWindowDimensions";
import AddIcon from '@material-ui/icons/Add';
import {IProducerNewCertificate} from "../../interfaces/Producer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        certificateForm: {
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
        cardCertificate: {
            justifyContent: 'center'
        }
    }),
);

interface Props {
    currentCertificates: IProducerNewCertificate[];
    addCertificate: Function;
    toggleCertificate: Function;
}

const ManageCertificatesForm = (props: Props) => {
    const classes = useStyles();
    const {handleSubmit, control, reset} = useForm<IProductTagAction>();
    const {height} = useWindowDimensions();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.toggleCertificate({
            name: event.target.name,
            selected: event.target.checked
        });
    };

    const handleAddCertificate = handleSubmit(({name}) => {
        if (!props.currentCertificates.some(certificate => certificate.name === name)) {
            props.addCertificate({
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
                    Certificates
                </Typography>
                <FormGroup style={{
                    height: "100%",
                    display: 'block',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <List>
                        {props.currentCertificates.map((currentCertificates, index) => (
                            <FormControlLabel key={index}
                                              control={<Switch checked={currentCertificates.selected}
                                                               onChange={handleChange}
                                                               name={currentCertificates.name}/>}
                                              label={currentCertificates.name}
                            />
                        ))}
                    </List>
                </FormGroup>

            </CardContent>
            <CardActions className={classes.cardCertificate}>
                <form className={classes.certificateForm} onSubmit={handleAddCertificate}>
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
                                label="Certificate Name"
                                name="name"
                                // autoFocus
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

export default ManageCertificatesForm;