import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


export default function CostOfAttendanceFilter(props) {
    const [valueCostOfAttendance, setValueCostOfAttendance] = useState([5000, 35000]);
    
    const handleChangeCostOfAttendance = (event, newValue) => {
        setValueCostOfAttendance(newValue);
    };

    return (
        <div>
            <Typography id="range-slider" gutterBottom align='left'>
                Cost of Attendance: {valueCostOfAttendance[0]} - {valueCostOfAttendance[1]}
            </Typography>
            <Slider
                value={valueCostOfAttendance}
                onChange={handleChangeCostOfAttendance}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={100000}
                step={1000}
            />
        </div>

    );

}



