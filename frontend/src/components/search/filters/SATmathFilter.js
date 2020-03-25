import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


export default function SATmathFilter(props) {
    const [valueSATmath, setValueSATmath] = useState([600, 700]);

    const handleChangeSATmath = (event, newValue) => {
        setValueSATmath(newValue);
    };

    return (
        <div>
            <Typography id="range-slider" gutterBottom align='left'>
                Average SAT Math: {valueSATmath[0]} - {valueSATmath[1]}
            </Typography>
            <Slider
                value={valueSATmath}
                onChange={handleChangeSATmath}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={200}
                max={800}
                step={10}
            />
        </div>

    );

}



