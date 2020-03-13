import React from 'react';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

const ProducerHomeScreen = () => {
    return (
        <div>
            Producer Page 2
            <Button component={Link} to="/producer" variant="contained">Producer1</Button>
        </div>
    );
};

export default ProducerHomeScreen;