import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link, useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },

    filters: {
        marginLeft: "20px",
        marginTop: "40px"
    },

    card: {
        marginTop: "40px",
        marginLeft: "60px"
    }

}));

// sliders
function valuetextAdmissionRate(value) {
    return `${value}%`;
}   

function valuetextSATmath(value) {
    return `${value}%`;
} 
  


export default function Search(props) {
    //DO we actually need this variable?
    const [SearchResult, setSearchResult] = useState(null);
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const [valueAdmissionRate, setValueAdmissionRate] = React.useState([25, 75]);
    const [valueSATmath, setValueSATmath] = React.useState([600, 700]);
    const [stateSmallSize, setStateSmallSize] = React.useState({
        checkedSmallSize: false
    });
    const [stateMediumSize, setStateMediumSize] = React.useState({
        checkedMediumSize: true
    });
    const [stateLargeSize, setStateLargeSize] = React.useState({
        checkedLargeSize: false
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

    useEffect(() => {
        async function fetchData() {
            // const res = await axios.get(location.pathname);
            // if(!res.data.error){
            //     console.log(res.data.q);
            // }
        };
        fetchData();
    });

    async function handleSearch(event){
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
                                    { title: 'Alabama'},
                                    { title: 'Alaska'},
                                    { title: 'Arizona'},
                                    { title: 'Arkansas'},
                                    { title: 'California'},
                                    { title: 'Colorado'},
                                    { title: 'Connecticut'},
                                    { title: 'Delaware'},
                                    { title: 'Florida'},
                                    { title: 'Georgia'},
                                    { title: 'Hawaii'},
                                    { title: 'Idaho'},
                                    { title: 'Illinois'},
                                    { title: 'Indiana'},
                                    { title: 'Iowa'},
                                    { title: 'Kansas'},
                                    { title: 'Kentucky'},
                                    { title: 'Louisiana'},
                                    { title: 'Maine'},
                                    { title: 'Maryland'},
                                    { title: 'Massachusetts'},
                                    { title: 'Michigan'},
                                    { title: 'Minnesota'},
                                    { title: 'Mississippi'},
                                    { title: 'Missouri'},
                                    { title: 'Montana'},
                                    { title: 'Nebraska'},
                                    { title: 'Nevada'},
                                    { title: 'New Hampshire'},
                                    { title: 'New Jersey'},
                                    { title: 'New Mexico'},
                                    { title: 'New York'},
                                    { title: 'North Carolina'},
                                    { title: 'North Dakota'},
                                    { title: 'Ohio'},
                                    { title: 'Oklahoma'},
                                    { title: 'Oregon'},
                                    { title: 'Pennsylvania'},
                                    { title: 'Rhode Island'},
                                    { title: 'South Carolina'},
                                    { title: 'South Dakota'},
                                    { title: 'Tennessee'},
                                    { title: 'Texas'},
                                    { title: 'Utah'},
                                    { title: 'Vermont'},
                                    { title: 'Virginia'},
                                    { title: 'Washington'},
                                    { title: 'West Virginia'},
                                    { title: 'Wisconsin'},
                                    { title: 'Wyoming'}
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
                                    { title: 'Accounting'},
                                    { title: 'Anthropology'},
                                    { title: 'Biochemistry'},
                                    { title: 'Biology'},
                                    { title: 'Business Management'},
                                    { title: 'Chemistry'},
                                    { title: 'Civil Engineering'},
                                    { title: 'Computer Engineering'},
                                    { title: 'Civil Engineering'},
                                    { title: 'Computer Science'},
                                    { title: 'Economics'},
                                    { title: 'Electrical Engineering'},
                                    { title: 'English'},
                                    { title: 'Geology'},
                                    { title: 'Health Science'},
                                    { title: 'History'},
                                    { title: 'Journalism'},
                                    { title: 'Mathematics'},
                                    { title: 'Mechanical Engineering'},
                                    { title: 'Music'},
                                    { title: 'Nursing'},
                                    { title: 'Philosophy'},
                                    { title: 'Physics'},
                                    { title: 'Political Science'},
                                    { title: 'Sociology'},
                                    { title: 'Theatre Arts'},
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

                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" align='left'>
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" align='left'>
                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                    across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                            Learn More
                            </Button>
                        </CardActions>
                    </Card>
                    
                </Grid>

            </Grid>
        </div>
      );
}