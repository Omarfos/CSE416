import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({

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

export default function SortOptions(props) {

    const classes = useStyles();

    const handleChangeSort = event => {
        const name = event.target.value;
        props.navigate(props.id, name)
    };

    return (

        <Grid container spacing={24}>
            <Grid item md={3} className={classes.sortOptions}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-simple"></InputLabel>
                    <Select native onChange={handleChangeSort}>
                        <option value="sort">Sort</option>
                        <option value="adm_rate">Admission Rate</option>
                        <option value="out_state_cost">Cost of Attendance</option>
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
                                <AntSwitch onChange={() => props.setOrder()} name="checkedOrder" />
                            </Grid>
                            <Grid item>Descending</Grid>
                        </Grid>
                    </Typography>
                </FormGroup>
            </Grid>
        </Grid>

    );
}
