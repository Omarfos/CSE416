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
        console.log('value: location.search', location.search)
        const values = queryString.parse(location)
        console.log('values', values)
        values.ACT_composite = value
        console.log('values', values)
        // history.push(queryString.stringify(values)
        let s = { ACT_composite: value }
        console.log('values', queryString.stringify({ ACT_composite: [1, 2] }, { arrayFormat: 'comma' }))
        let a = queryString.stringify(s, { arrayFormat: 'comma' });
        // location.search = a
        console.log('values : a', a)
        console.log('value: location.search', location.search)
        history.push('v1?' + a)

    }


    return (
        < div >
            {console.log('RENDER')}

            <Typography id="range-slider" gutterBottom align='left'>
                {props.startText}: {props.value[0]} - {props.value[1]} {props.endText}
            </Typography>
            <Slider
                value={value}
                onChange={(e, v) => { setValue(v) }}
                onMouseUp={(e) => { navigateUrl(); props.setValue(value) }}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={props.min}
                max={props.max}
                step={props.step}
            />
        </div >

    );

}