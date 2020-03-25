import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


export default function AdmissionRateFilter(props) {
    const [valueAdmissionRate, setValueAdmissionRate] = useState([25, 75]);

    const handleChangeAdmissionRate = (event, newValue) => {
        setValueAdmissionRate(newValue);
    };

    return (
        <div>
            <Typography id="range-slider" gutterBottom align='left'>
                Admission Rate: {valueAdmissionRate[0]} - {valueAdmissionRate[1]} %
            </Typography>
            <Slider
                value={valueAdmissionRate}
                onChange={handleChangeAdmissionRate}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
            />
        </div>

    );

}



