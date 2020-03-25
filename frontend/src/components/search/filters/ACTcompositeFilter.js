import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


export default function ACTcompositeFilter(props) {
    const [valueACTcomposite, setValueACTcomposite] = useState([28, 32]);

    const handleChangeACTcomposite = (event, newValue) => {
        setValueACTcomposite(newValue);
    };

    return (
        <div>
            <Typography id="range-slider" gutterBottom align='left'>
                Average ACT Composite: {valueACTcomposite[0]} - {valueACTcomposite[1]}
            </Typography>
            <Slider
                value={valueACTcomposite}
                onChange={handleChangeACTcomposite}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={1}
                max={36}
            />
        </div>

    );

}



