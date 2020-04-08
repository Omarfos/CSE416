import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tab:{
      fontSize:"1.3vw",
      height: "70px"
  },
  grid:{
      width:"100%"
  }
}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Score" {...a11yProps(0)} className={classes.tab}/>
        <Tab label="High School" {...a11yProps(1)} className={classes.tab}/>
        <Tab label="College" {...a11yProps(2)} className={classes.tab}/>
        <Tab label="Account Setting" {...a11yProps(3)} className={classes.tab}/>
      </Tabs>
      <TabPanel value={value} index={0}>
          <Grid container direction="column" justify="flex-start" alignItems="center" className={classes.grid}>
            <Grid item xs={12}>
                <Typography variant="h6">
                ACT Scores
                </Typography>
                
                ACT Composite:  {props.student.ACT_composite}
                ACT English: {props.student.ACT_english}
                <br />
                ACT MATH: {props.student.ACT_math}
                ACT Reading: {props.student.ACT_reading}
                <br />
                ACT Science: {props.student.ACT_science}
                <br />
            </Grid>
            <Grid>
                <Typography variant="h6">
                SAT Scores
                </Typography>
                SAT: {props.student.SAT}
                <br />
                SAT MATH: {props.student.SAT_math}
                <br />
                SAT EBRW: {props.student.SAT_EBRW}
                <br />
                Literature: {props.student.SAT_literature}
                <br />
                US History: {props.student.SAT_US_hist}
                <br />
                World History: {props.student.SAT_world_hist}
                <br />
                Math Subject I: {props.student.SAT_math_I}
                <br />
                Math Subject II:{props.student.SAT_math_II}
                <br />
                Economic: {props.student.SAT_eco_bio}
                <br />
                Biology: {props.student.SAT_mol_bio}
                <br />
                Chemistry: {props.student.SAT_chemistry}
                <br />
                Physics: {props.student.SAT_physics}
                <br />
            </Grid>

          </Grid>
       
        
        <Divider variant="fullWidth"/>
        
        
        
        AP test passed: {props.student.num_AP_passed}
      </TabPanel>
      <TabPanel value={value} index={1}>
        High School Name: {props.student.high_school_name}
        <br />
        City: {props.student.high_school_city}, State: {props.student.high_school_state}
        <br />
        GPA: {props.student.GPA}
        major??
      </TabPanel>
      <TabPanel value={value} index={2}>
        Class of {props.student.college_class}
        <br />
        Current College (if any)
        <br />
        College City, State, Major, College GPA, College Classes taken
        <br />
        Colleges Applied, Status (Whether Questionable)
      </TabPanel>
      <TabPanel value={value} index={3}>
        {props.student.id}
        Email??
        Password / change
      </TabPanel>
    </div>
  );
}