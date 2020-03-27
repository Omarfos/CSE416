import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Image from '../../images/homeBackground_blur.png';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SimpleTabs from "./collegeTabComponent";
import SimpleCard from "./CollegeCard";

const useStyles = makeStyles(theme => ({
    body: {
        marginTop: "100px",
    },
    backgound:{
        //position: 'relative',
        position: 'absolute',
         left: 0,
         right: 0,
         top:0,
        backgroundImage: 'url('+ Image+')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: "-1",
    },
    header: {
        textAlign: 'left',
        marginBottom: "50px"
    },
    table: {
        // maxWidth: "90%"
    },

    tableHead: {
        paddingTop: 3,
        paddingBottom: 3,
        color: "white",
        backgroundColor: "rgb(80,81,85)"
    },
    tableCell: {
        paddingTop: 3,
        paddingBottom: 3,
        color: "rgb(80,81,85)"
    }
}));


export default function CollegeProfile(props) {
    const [college, setCollege] = useState(null);
    const [similarHighSchools, setSimilarHighSchools] = useState(null); 
    //Use to store the similar high schools.
    const [resultDisplay, setResultDisplay] = useState(null);
    //Use to store the results for similar student profiles. 
    const location = useLocation();
    const classes = useStyles();

    useEffect(() => {
        let url = "http://localhost:8000" +location.pathname; //    /college/q
        fetch(url)
            //.then(response => response.json())
            .then(
                (data) => {
                    if (data.status === 200){
                        async function getData(){
                            let college = await data.json();
                            setCollege(college);
                        }
                        getData();
                    }
                    setCollege(data)
                }
            );
    }, []);

    async function handleUpdateFilter(event) {
        event.preventDefault();
        setResultDisplay(null);
    }
    async function handleSearchSimilarHighSchool(event) {
        event.preventDefault();
        setSimilarHighSchools(null);
    }

    return (
        <div className={classes.backgound}>
            <Container maxWidth="md">
            {!college &&
                <div className={classes.body}>
                    <br /><br /><br />
                    <h1>No College Found</h1>
                </div>
            }
            {college &&
                <div className={classes.body}>
                    <Grid className = {classes.header} container direction="row" justify="space-between" alignItems="flex-start">
                        <Grid item xs={6}>
                            <Typography variant="h4">{college.name}</Typography>
                            <Typography variant="h6">#  {college.ranking} in National Universities</Typography>
                            <Typography variant="body1">{college.institution_type} University in {college.state}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TableContainer component={Paper} className={classes.table}>
                                <Table aria-label="College Quick Stats" >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left" className={classes.tableHead}>Quick Stats</TableCell>
                                            <TableCell className={classes.tableHead}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="left" className={classes.tableCell}>Tuition and Fees (in-state)</TableCell>
                                            <TableCell align="right" className={classes.tableCell}>${college.in_state_cost}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left" className={classes.tableCell}>Tuition and Fees (out-state)</TableCell>
                                            <TableCell align="right" className={classes.tableCell}>${college.out_state_cost}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left" className={classes.tableCell}>Median Graduate Debt</TableCell>
                                            <TableCell align="right" className={classes.tableCell}>${college.grad_debt_median}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left" className={classes.tableCell}>Total Undergradate Enrollment</TableCell>
                                            <TableCell align="right" className={classes.tableCell}>{college.size}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left" className={classes.tableCell}>Completion Rate</TableCell>
                                            <TableCell align="right" className={classes.tableCell}>{college.completion_rate} %</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    <SimpleCard college={college}/>
                    
                </div>
            }
            </Container>
        </div>
    );
}
