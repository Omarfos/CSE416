import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';



export default function SliderFactory(props) {
    const [value, setValue] = useState(props.value);

    // const handleChangeACTcomposite = (event, newValue) => {
    //     setValueACTcomposite(newValue);
    // };

    return (
        < div >
            {console.log('RENDER')}

            <Typography id="range-slider" gutterBottom align='left'>
                Average ACT Composite: {props.value[0]} - {props.value[1]}
            </Typography>
            <Slider
                value={value}
                onChange={(e, v) => { setValue(v) }}
                onMouseUp={(e) => { props.setValue(value) }}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={props.min}
                max={props.max}
            />
        </div >

    );

}