import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';




export default function LocationFilter(props) {

    return (

        <Autocomplete
            multiple
            id="tags-outlined"
            options={[
                { title: 'Alabama', code: 'AL' },
                { title: 'Alaska' },
                { title: 'Arizona' },
                { title: 'Arkansas' },
                { title: 'California' },
                { title: 'Colorado' },
                { title: 'Connecticut' },
                { title: 'Delaware' },
                { title: 'Florida' },
                { title: 'Georgia' },
                { title: 'Hawaii' },
                { title: 'Idaho' },
                { title: 'Illinois' },
                { title: 'Indiana' },
                { title: 'Iowa' },
                { title: 'Kansas' },
                { title: 'Kentucky' },
                { title: 'Louisiana' },
                { title: 'Maine' },
                { title: 'Maryland' },
                { title: 'Massachusetts' },
                { title: 'Michigan' },
                { title: 'Minnesota' },
                { title: 'Mississippi' },
                { title: 'Missouri' },
                { title: 'Montana' },
                { title: 'Nebraska' },
                { title: 'Nevada' },
                { title: 'New Hampshire' },
                { title: 'New Jersey' },
                { title: 'New Mexico' },
                { title: 'New York' },
                { title: 'North Carolina' },
                { title: 'North Dakota' },
                { title: 'Ohio' },
                { title: 'Oklahoma' },
                { title: 'Oregon' },
                { title: 'Pennsylvania' },
                { title: 'Rhode Island' },
                { title: 'South Carolina' },
                { title: 'South Dakota' },
                { title: 'Tennessee' },
                { title: 'Texas' },
                { title: 'Utah' },
                { title: 'Vermont' },
                { title: 'Virginia' },
                { title: 'Washington' },
                { title: 'West Virginia' },
                { title: 'Wisconsin' },
                { title: 'Wyoming' }
            ]}
            getOptionLabel={option => option.title}
            filterSelectedOptions
            renderInput={params => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Location"
                    placeholder="Select State"
                />
            )}
        />

    );

}



