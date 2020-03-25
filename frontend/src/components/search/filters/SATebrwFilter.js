import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


export default function SATebrwFilter(props) {
   
    const [valueSATebrw, setValueSATebrw] = useState([600, 700]);

    const handleChangeSATebrw = (event, newValue) => {
        setValueSATebrw(newValue);
    };

    return (
        <div>
            <Typography id="range-slider" gutterBottom align='left'>
                Average SAT EBRW: {valueSATebrw[0]} - {valueSATebrw[1]}
            </Typography>
            <Slider
                value={valueSATebrw}
                onChange={handleChangeSATebrw}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={200}
                max={800}
                step={10}
            />
        </div>

    );

}



