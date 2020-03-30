import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import queryString from 'query-string'
import { useLocation, Link, useHistory, useParams } from "react-router-dom";


export default function SliderFactory(props) {
    const [value, setValue] = useState([]);
    const location = useLocation()

    // on load, set slider values according to url
    useEffect(() => {
        const params = queryString.parse(location.search, { arrayFormat: 'comma' });
        if (!params[props.id])
            setValue([props.min, props.max])
        else
            setValue(params[props.id].map(p => Number(p)))
    }, [])

    return (
        <div>
            {props.id != 'adm_rate' ?
                <Typography id="range-slider" gutterBottom align='left'>
                    {props.startText}: {value[0]} - {value[1]} {props.endText}
                </Typography> :
                <Typography id="range-slider" gutterBottom align='left'>
                    {props.startText}: {value[0] * 100} - {value[1] * 100} {props.endText}
                </Typography>
            }

            <Slider
                value={value}
                onChange={(e, v) => { setValue(v) }}
                onChangeCommitted={(e) => { props.navigate(props.id, value) }}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={props.min}
                max={props.max}
                step={props.step}
            />
        </div>

    );

}