import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';



export default function SliderFactory(props) {
    const [value, setValue] = useState(props.value);

    return (
        < div >
            {console.log('RENDER')}

            <Typography id="range-slider" gutterBottom align='left'>
                {props.startText}: {props.value[0]} - {props.value[1]} {props.endText}
            </Typography>
            <Slider
                value={value}
                onChange={(e, v) => { setValue(v) }}
                onMouseUp={(e) => { props.setValue(value) }}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={props.min}
                max={props.max}
                step={props.step}
            />
        </div >

    );

}