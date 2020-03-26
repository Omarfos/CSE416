import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link, useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import CollegeCard from './CollegeCard';
import Pagination from '@material-ui/lab/Pagination';
import SortOptions from './Sorting.js'
import LocationFilter from './filters/LocationFilter';
import MajorFilter from './filters/MajorFilter';
import SizeFilter from './filters/SizeFilter';
import SliderFactory from './filters/SliderFactory';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },

    filters: {
        marginLeft: "20px",
        marginTop: "60px"
    },

    pagination: {
        marginTop: "40px",
        marginBottom: "40px",
        marginLeft: "35%"
    }

}));


export default function Search(props) {
    //DO we actually need this variable?
    const [SearchResult, setSearchResult] = useState(null);
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const [colleges, setColleges] = useState([{ "name": "Stony Brook" }, { "name": "Wagner College" }, { "name": "New York University" },
    { "name": "Boston University" }, { "name": "Princeton University" }, { "name": "Harvard University" }]);
    // const [filters, setFilters] = useState([{ "name": "Stony Brook" }, { "name": "Wagner College" }, { "name": "N" }]);
    const [act, setACT] = useState([28, 32]);
    const [cost, setCost] = useState([5000, 35000]);
    const [ranking, setRanking] = useState([10, 50]);
    const [SATebrw, setSATebrw] = useState([600, 700]);
    const [SATmath, setSATmath] = useState([600, 700]);
    const [admissionRate, setAdmissionRate] = useState([25, 75]);

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
                        </Grid>

                        <Grid item md={12}>
                            <LocationFilter />
                        </Grid>

                        <Grid item md={12}>
                            <MajorFilter />
                        </Grid>

                        <Grid item md={12}>
                            <div className={classes.root}>
                            <SliderFactory value={admissionRate} setValue={setAdmissionRate} min={1} max={100} startText={"Admission Rate"} endText={"%"} step={1}/>
                            </div>
                        </Grid>

                        <Grid item md={12}>
                            <div className={classes.root}>
                                <SliderFactory value={SATmath} setValue={setSATmath} min={200} max={800} startText={"Average SAT Math"} endText={""} step={10}/>
                            </div>
                        </Grid>

                        <Grid item md={12}>
                            <div className={classes.root}>
                                <SliderFactory value={SATebrw} setValue={setSATebrw} min={200} max={800} startText={"Average SAT EBRW"} endText={""} step={10}/>
                            </div>
                        </Grid>

                        <Grid item md={12}>
                            <div className={classes.root}>
                                <SliderFactory value={act} setValue={setACT} min={1} max={36} startText={"Average ACT Composite"} endText={""} step={1}/>
                            </div>
                        </Grid>

                        <Grid item md={12}>
                            <div className={classes.root}>
                                <SliderFactory value={cost} setValue={setCost} min={0} max={100000} startText={"Cost of Attendance"} endText={"$"} step={1000}/>
                            </div>
                        </Grid>

                        <Grid item md={12}>
                            <div className={classes.root}>
                                <SliderFactory value={ranking} setValue={setRanking} min={1} max={100} startText={"Ranking"} endText={"%"} step={1}/>
                            </div>
                        </Grid>

                        <Grid item md={12}>
                            <SizeFilter />
                        </Grid>

                    </Grid>
                </Grid>

                {/* right side - colleges */}
                <Grid item md={9}>

                    {/* Sorting */}
                    <SortOptions />

                    {/* college cards */}
                    {colleges.map((college) =>
                        <CollegeCard college={college} />
                    )}

                    {/* pagination */}
                    <Pagination count={10} color="primary" className={classes.pagination} />

                </Grid>

            </Grid>
        </div>
    );
}
