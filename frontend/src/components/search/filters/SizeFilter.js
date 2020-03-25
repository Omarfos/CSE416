import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


export default function SizeFilter(props) {

    const [stateSmallSize, setStateSmallSize] = useState({
        checkedSmallSize: false
    });
    const [stateMediumSize, setStateMediumSize] = useState({
        checkedMediumSize: true
    });
    const [stateLargeSize, setStateLargeSize] = useState({
        checkedLargeSize: false
    });

    const handleChangeSmallSize = event => {
        setStateSmallSize({ ...stateSmallSize, [event.target.name]: event.target.checked });
    };

    const handleChangeMediumSize = event => {
        setStateMediumSize({ ...stateMediumSize, [event.target.name]: event.target.checked });
    };

    const handleChangeLargeSize = event => {
        setStateLargeSize({ ...stateLargeSize, [event.target.name]: event.target.checked });
    };

    return (
        
        <div>
            <Typography id="size-checkbox" gutterBottom align='left'>
                Undegraduate Enrollment:
            </Typography>
            <FormGroup column>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={stateSmallSize.checkedSmallSize}
                            onChange={handleChangeSmallSize}
                            name="checkedSmallSize"
                            color="primary"
                        />
                    }
                    label="Small (up to 5000)"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={stateMediumSize.checkedMediumSize}
                            onChange={handleChangeMediumSize}
                            name="checkedMediumSize"
                            color="primary"
                        />
                    }
                    label="Medium (5000 - 15000)" 
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={stateLargeSize.checkedLargeSize}
                            onChange={handleChangeLargeSize}
                            name="checkedLargeSize"
                            color="primary"
                        />
                    }
                    label="Large (15000 and more)"
                />
            </FormGroup>

        </div>

    );

}



