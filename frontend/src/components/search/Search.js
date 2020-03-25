import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link, useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CollegeCard from './CollegeCard';
import Pagination from '@material-ui/lab/Pagination';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },

    filters: {
        marginLeft: "20px",
        marginTop: "40px"
    },

    pagination: {
        marginTop: "40px",
        marginBottom: "40px",
        marginLeft: "35%"
    },

    formControl: {
        marginTop: "20px",
        width: "200px"
    },

    sortOrder: {
        marginTop: "40px"
    },

    sortOptions: {
        marginLeft: "50%"
    }

}));

// sliders
function valuetextAdmissionRate(value) {
    return `${value}%`;
}

function valuetextSATmath(value) {
    return `${value}%`;
}


const AntSwitch = withStyles(theme => ({
    root: {
      width: 28,
      height: 16,
      padding: 2,
      display: 'flex',
    },
    switchBase: {
      padding: 3,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);


export default function Search(props) {
    //DO we actually need this variable?
    const [SearchResult, setSearchResult] = useState(null);
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const [colleges, setColleges] = useState([{ "name": "Stony Brook" }, { "name": "Wagner College" }, { "name": "New York University" }, 
            {"name": "Boston University"}, {"name": "Princeton University"}, {"name": "Harvard University"}]);
    // const [filters, setFilters] = useState([{ "name": "Stony Brook" }, { "name": "Wagner College" }, { "name": "N" }]);
    const [valueAdmissionRate, setValueAdmissionRate] = useState([25, 75]);
    const [valueSATmath, setValueSATmath] = useState([600, 700]);
    const [stateSmallSize, setStateSmallSize] = useState({
        checkedSmallSize: false
    });
    const [stateMediumSize, setStateMediumSize] = useState({
        checkedMediumSize: true
    });
    const [stateLargeSize, setStateLargeSize] = useState({
        checkedLargeSize: false
    });
    const [stateSort, setStateSort] = useState({
        sortBy: "Ranking"
    });

    const [stateOrder, setStateOrder] = useState({
        checkedOrder: false
      });

    const handleChangeAdmissionRate = (event, newValue) => {
        setValueAdmissionRate(newValue);
    };

    const handleChangeSATmath = (event, newValue) => {
        setValueSATmath(newValue);
    };

    const handleChangeSmallSize = event => {
        setStateSmallSize({ ...stateSmallSize, [event.target.name]: event.target.checked });
    };

    const handleChangeMediumSize = event => {
        setStateMediumSize({ ...stateMediumSize, [event.target.name]: event.target.checked });
    };

    const handleChangeLargeSize = event => {
        setStateLargeSize({ ...stateLargeSize, [event.target.name]: event.target.checked });
    };

    const handleChangeSort = event => {
        const name = event.target.name;
        setStateSort({
          ...stateSort,
          [name]: event.target.value
        });
    };

    const handleChangeOrder = event => {
        setStateOrder({ ...stateOrder, [event.target.name]: event.target.checked });
    };

    useEffect(() => {
        async function fetchData() {
            // const res = await axios.get(location.pathname);
            // if(!res.data.error){
            //     console.log(res.data.q);
            // }
        };
        fetchData();
    });

    async function handleSearch(event) {
        event.preventDefault();
        history.push('/search/' + event.target.searchQuery.value);
        //refresh. or whatever
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>

                {/* left side - filters */}
                <Grid item md={2} className={classes.filters}>
                    <Grid container spacing={2}>

                        <Grid item md={12}>
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={[
                                    { title: 'Alabama' },
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
                                // style={
                                //     {width: 300}
                                // }
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Location"
                                        placeholder="Select State"
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item md={12}>
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
                        </Grid>

                        <Grid item md={12}>
                            <div className={classes.root}>
                                <Typography id="range-slider" gutterBottom align='left'>
                                    Admission Rate: {valueAdmissionRate[0]} - {valueAdmissionRate[1]} %
                                </Typography>
                                <Slider
                                    value={valueAdmissionRate}
                                    onChange={handleChangeAdmissionRate}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    getAriaValueText={valuetextAdmissionRate}
                                />
                            </div>
                        </Grid>
                        <Grid item md={12}>
                            <div className={classes.root}>
                                <Typography id="range-slider" gutterBottom align='left'>
                                    Average SAT Math: {valueSATmath[0]} - {valueSATmath[1]}
                                </Typography>
                                <Slider
                                    value={valueSATmath}
                                    onChange={handleChangeSATmath}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    getAriaValueText={valuetextSATmath}
                                    min={200}
                                    max={800}
                                    step={10}
                                />
                            </div>
                        </Grid>

                        <Grid item md={12}>
                            <Typography id="size-checkbox" gutterBottom align='left'>
                                Student Body Size:
                            </Typography>
                            <FormGroup column>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={stateSmallSize.checkedSmallSize}
                                            onChange={handleChangeSmallSize}
                                            name="checkedSmallSize"
                                            color="primary"
                                        />
                                    }
                                    label="Small"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={stateMediumSize.checkedMediumSize}
                                            onChange={handleChangeMediumSize}
                                            name="checkedMediumSize"
                                            color="primary"
                                        />
                                    }
                                    label="Medium"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={stateLargeSize.checkedLargeSize}
                                            onChange={handleChangeLargeSize}
                                            name="checkedLargeSize"
                                            color="primary"
                                        />
                                    }
                                    label="Large"
                                />
                            </FormGroup>
                        </Grid>

                    </Grid>
                </Grid>

                {/* right side - colleges */}
                <Grid item md={9}>

                    <Grid container spacing={24}>
                        <Grid item md={3} className={classes.sortOptions}>
                            {/* sort option */}
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple"></InputLabel>
                                <Select
                                    native
                                    value={stateSort.age}
                                    onChange={handleChangeSort}
                                    inputProps={{
                                        sortBy: 'age',
                                        order: 'age-native-simple',
                                    }}
                                    >
                                    <option value="admissionRate">Admission Rate</option>
                                    <option value="costOfAttendance">Cost of Attendance</option>
                                    <option value="ranking">Ranking</option>
                                    <option value="recommendationScore">Recommendation Score</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={3}>
                            {/* sortOrder */}
                            <FormGroup className={classes.sortOrder}>
                                <Typography component="div">
                                    <Grid component="label" container alignItems="center" spacing={1}>
                                    <Grid item>Ascending</Grid>
                                    <Grid item>
                                        <AntSwitch checked={stateOrder.checkedOrder} onChange={handleChangeOrder} name="checkedOrder" />
                                    </Grid>
                                    <Grid item>Descending</Grid>
                                    </Grid>
                                </Typography>
                            </FormGroup>
                        </Grid>
                    </Grid>

                    {/* college cards */}
                    {colleges.map((college) =>
                        <CollegeCard college={college} />
                    )}

                    {/* pagination */}
                    <Pagination count={10} color="primary" className={classes.pagination}/>

                </Grid>

            </Grid>
        </div>
    );
}
