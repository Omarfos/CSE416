import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function MajorFilter(props) {

    return (
        <Autocomplete
            multiple
            id="tags-outlined"
            options={[
                { title: 'Accounting' },
                { title: 'Anthropology' },
                { title: 'Biochemistry' },
                { title: 'Biology' },
                { title: 'Business Management' },
                { title: 'Chemistry' },
                { title: 'Civil Engineering' },
                { title: 'Theatre Arts' },
            ]}
            getOptionLabel={option => option.title}
            filterSelectedOptions
            renderInput={params => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Major"
                    placeholder="Select Subject"
                />
            )}
        />

    );

}



