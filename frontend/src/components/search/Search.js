import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string'
import { useLocation, Link, useHistory, useParams } from "react-router-dom";
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CollegeCard from './CollegeCard';
import Pagination from '@material-ui/lab/Pagination';
import SortOptions from './Sorting.js'
import LocationFilter from './filters/LocationFilter';
import MajorFilter from './filters/MajorFilter';
import SizeFilter from './filters/SizeFilter';
import SliderFactory from './filters/SliderFactory';
import LinearProgress from '@material-ui/core/LinearProgress';
import Image from '../../images/homeBackground_blur.png';

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
    const location = useLocation();
    const history = useHistory()
    const classes = useStyles();
    const [colleges, setColleges] = useState([]);
    const [act, setACT] = useState([0, 36]);
    const [cost, setCost] = useState([0, 100000]);
    const [ranking, setRanking] = useState([0, 500]);
    const [SATebrw, setSATebrw] = useState([0, 800]);
    const [SATmath, setSATmath] = useState([0, 800]);
    const [size, setSize] = useState([0, 30000]);
    const [admissionRate, setAdmissionRate] = useState([0, 1]);
    const [sort, setSort] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSearch = (query) => {
        setLoading(true)
        console.log('query', query)
        axios.get('http://localhost:8000/search' + query, {
            responseType: 'json'
        }).then((response) => {
            setColleges(response.data.map(c => {
                return c.fields
            }))
        })
        setLoading(false)
    }

    const setOrder = () => {
        setLoading(true)
        setColleges(colleges.slice().reverse())
        setLoading(false)
    }

    useEffect(() => {
        handleSearch(location.search)
    }, [location.search])

    const navigate = (id, value) => {
        const params = queryString.parse(location.search, { arrayFormat: 'comma' })
        params[id] = value
        history.push('college?' + queryString.stringify(params, { arrayFormat: 'comma' }))
    }

    return (

        < div className={classes.root} >
            <Grid container spacing={2}>

                {/* left side - filters */}
                <Grid item md={2} className={classes.filters}>
                    <Grid container spacing={2}>

                        <Grid item md={12}>
                            <LocationFilter id="states" navigate={navigate} />
                        </Grid>

                        <Grid item md={12}>
                            <MajorFilter id="majors" navigate={navigate} />
                        </Grid>

                        <Grid item md={12}>
                            <div>
                                <SliderFactory id='adm_rate' navigate={navigate} min={0} max={1} startText={"Admission Rate"} endText={"%"} step={0.1} />
                            </div>
                        </Grid>

                        <Grid item md={12}>
                            <div>
                                <SliderFactory id='SAT_math' navigate={navigate} min={200} max={800} startText={"Average SAT Math"} endText={""} step={50} />
                            </div>
                        </Grid>

                        <Grid item md={12}>
                            <div>
                                <SliderFactory id='SAT_EBRW' navigate={navigate} min={200} max={800} startText={"Average SAT EBRW"} endText={""} step={50} />
                            </div>
                        </Grid>

                        <Grid item md={12}>
                            <div>
                                <SliderFactory id='ACT_composite' navigate={navigate} min={1} max={36} startText={"Average ACT Composite"} endText={""} step={2} />
                            </div>
                        </Grid>

                        <Grid item md={12}>
                            <div>
                                <SliderFactory id='out_state_cost' navigate={navigate} min={0} max={100000} startText={"Cost of Attendance"} endText={"$"} step={1000} />
                            </div>
                        </Grid>

                        <Grid item md={12}>
                            <div>
                                <SliderFactory id='ranking' navigate={navigate} min={0} max={500} startText={"Ranking"} endText={""} step={25} />
                            </div>
                        </Grid>

                        <Grid item md={12}>
                            <SizeFilter id='size' navigate={navigate} />
                            <br /><br /><br /><br />  <br /><br /><br /><br />
                        </Grid>
                    </Grid>
                </Grid>

                {/* right side - colleges */}
                <Grid item md={9}>
                    <SortOptions id='sort' navigate={navigate} setOrder={setOrder} />

                    {loading ?
                        <LinearProgress variant="query" /> :
                        colleges.map((college) =>
                            <CollegeCard college={college} />

                        )
                    }

                    {/* pagination */}
                    <Pagination count={10} color="primary" className={classes.pagination} />

                </Grid>

            </Grid>
        </div >
    );
}
