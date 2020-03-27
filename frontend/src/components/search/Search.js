import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link, useHistory, useParams } from "react-router-dom";
import queryString from 'query-string'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CollegeCard from './CollegeCard';
import Pagination from '@material-ui/lab/Pagination';
import SortOptions from './Sorting.js'
import LocationFilter from './filters/LocationFilter';
import MajorFilter from './filters/MajorFilter';
import SizeFilter from './filters/SizeFilter';
import SliderFactory from './filters/SliderFactory';
import Image from '../../images/homeBackground_blur.png';
import { Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundImage: 'url(' + Image + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
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
    const [colleges, setColleges] = useState([{ "name": "Stony Brook", "ranking": "56", "adm_rate": "0.5", "state": "NY", "institution_type": "Public" }, { "name": "Wagner College" }, { "name": "New York University" },
    { "name": "Boston University" }, { "name": "Princeton University" }, { "name": "Harvard University" }]);
    // const [filters, setFilters] = useState([{ "name": "Stony Brook" }, { "name": "Wagner College" }, { "name": "N" }]);
    const [act, setACT] = useState([0, 36]);
    const [cost, setCost] = useState([5000, 35000]);
    const [ranking, setRanking] = useState([0, 100]);
    const [SATebrw, setSATebrw] = useState([600, 700]);
    const [SATmath, setSATmath] = useState([600, 700]);
    const [admissionRate, setAdmissionRate] = useState([25, 75]);


    let slug = useParams()

    let query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        // const values = queryString.parse(useLocation().search)
        // values.ACT_composite = act[0] + ',' + act[1]
        // console.log('values', values)
        // for (let [k, v] in query.keys())
        //     console.log(k, v)
        // for (const [key, value] of query) {
        //     console.log('key', key)
        //     console.log('value', value)
        // }
        // handleSearch(location.search)
        // navigateUrl();
        // console.log('USE EFFECT');
    }, [])

    const navigateUrl = () => {
        const values = queryString.parse(location.search)
        console.log('values', values)
        values.ACT_composite = [1, 2]
        console.log('values', values)
        // history.push(queryString.stringify(values)
        let s = { ACT_composite: act }
        console.log('values', queryString.stringify({ ACT_composite: [1, 2] }, { arrayFormat: 'comma' }))
        let a = queryString.stringify(s, { arrayFormat: 'comma' });
        console.log('values : a', a)
        // history.push(a)

    }




    const handleSearch = (query) => {
        console.log('query', query)
        axios.get('http://localhost:8000/search' + query, {
            responseType: 'json',
            // params: {
            //     ranking: ranking[0] + ',' + ranking[1],
            //     sort: sortType
            // }
        }).then((response) => {
            let colle = response.data.map(c => {
                return c.fields
            })
            setColleges(colle)
            console.log(colle[0])
        })
    }

    return (

        <div className={classes.root}>

            <Grid container spacing={2}>

                {/* left side - filters */}
                <Grid item md={2} className={classes.filters}>
                    <Grid container spacing={2}>

                        <Grid item md={12}>
                            <Button onClick={() => handleSearch('adm_rate')}> Hello </Button>
                        </Grid>

                        <Grid item md={12}>
                            <LocationFilter />
                        </Grid>

                        <Grid item md={12}>
                            <MajorFilter />
                        </Grid>

                        <Grid item md={12}>
                            <div>
                                <SliderFactory value={admissionRate} setValue={setAdmissionRate} min={1} max={100} startText={"Admission Rate"} endText={"%"} step={1} />
                            </div>
                        </Grid>

                        <Grid item md={12}>
                            <div>
                                <SliderFactory value={SATmath} setValue={setSATmath} min={200} max={800} startText={"Average SAT Math"} endText={""} step={10} />
                            </div>
                        </Grid>

                        <Grid item md={12}>
                            <div>
                                <SliderFactory value={SATebrw} setValue={setSATebrw} min={200} max={800} startText={"Average SAT EBRW"} endText={""} step={10} />
                            </div>
                        </Grid>

                        <Grid item md={12}>
                            <div>
                                <SliderFactory value={act} setValue={setACT} min={1} max={36} startText={"Average ACT Composite"} endText={""} step={1} />
                            </div>
                        </Grid>

                        <Grid item md={12}>
                            <div>
                                <SliderFactory value={cost} setValue={setCost} min={0} max={100000} startText={"Cost of Attendance"} endText={"$"} step={1000} />
                            </div>
                        </Grid>

                        <Grid item md={12}>
                            <div>
                                <SliderFactory value={ranking} setValue={setRanking} min={1} max={100} startText={"Ranking"} endText={"%"} step={1} />
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
