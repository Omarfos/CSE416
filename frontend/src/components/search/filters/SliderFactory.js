import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import queryString from 'query-string'
import { useLocation, Link, useHistory, useParams } from "react-router-dom";


export default function SliderFactory(props) {
    const [value, setValue] = useState(props.value);
    const location = useLocation()
    const history = useHistory()

    const navigateUrl = () => {
        const values = queryString.parse(location.search, { arrayFormat: 'comma' })
        values[props.id] = value
        let s = queryString.stringify(values, { arrayFormat: 'comma' })
        history.push('college?' + s)
    }



    return (
        <div>
            {props.id != 'adm_rate' ?
                <Typography id="range-slider" gutterBottom align='left'>
                    {props.startText}: {props.value[0]} - {props.value[1]} {props.endText}
                </Typography> :
                <Typography id="range-slider" gutterBottom align='left'>
                    {props.startText}: {props.value[0] * 100} - {props.value[1] * 100} {props.endText}
                </Typography>
            }

            <Slider
                value={value}
                onChange={(e, v) => { setValue(v) }}
                onMouseUp={(e) => { props.setValue(value); navigateUrl(); }}
                // onMouseUp={(e) => { navigateUrl() }}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={props.min}
                max={props.max}
                step={props.step}
            />
        </div>

    );

}