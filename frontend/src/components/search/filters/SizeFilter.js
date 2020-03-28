import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import queryString from 'query-string';
import { useLocation, Link, useHistory, useParams } from "react-router-dom";


export default function SizeFilter(props) {

    const location = useLocation()
    const history = useHistory()

    const [checkedSizes, setChecked] = useState({
        small: false,
        medium: false,
        large: false
    });

    const navigateUrl = (e) => {
        const { checked, name } = e.target;
        setChecked({ ...checkedSizes, [name]: checked })
        const values = queryString.parse(location.search, { arrayFormat: 'comma' })

        if (!checked) {
            values[props.id] = [0, 100000]
        } else {
            switch (name) {
                case 'small':
                    values[props.id] = [0, 5000];
                    break;
                case 'medium':
                    values[props.id] = [5000, 15000];
                    break;
                case 'large':
                    values[props.id] = [15000, 100000];
            }
        }
        props.setValue(values[props.id])

        let s = queryString.stringify(values, { arrayFormat: 'comma' })
        history.push('college?' + s)
    };

    return (
        <div>
            <Typography id="size-checkbox" gutterBottom align='left'>
                Undegraduate Enrollment:
            </Typography>
            <FormGroup column>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkedSizes.small}
                            onChange={e => navigateUrl(e)}
                            name="small"
                            color="primary"
                        />
                    }
                    label="Small (up to 5000)"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkedSizes.medium}
                            onChange={e => navigateUrl(e)}
                            name="medium"
                            color="primary"
                        />
                    }
                    label="Medium (5000 - 15000)"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkedSizes.large}
                            onChange={e => navigateUrl(e)}
                            name="large"
                            color="primary"
                        />
                    }
                    label="Large (15000 and more)"
                />
            </FormGroup>
        </div>

    );

}



