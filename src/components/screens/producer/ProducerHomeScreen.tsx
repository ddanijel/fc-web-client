import React from 'react';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

const ProducerHomeScreen = () => {
    return (
        <div>
            Producer Page 1

            <Button component={Link} to="/producer2" variant="contained">Producer2</Button>
        </div>
    );
};

export default ProducerHomeScreen;