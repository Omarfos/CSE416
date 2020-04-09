import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';


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
  container:{
      width:"68%",
      marginLeft:"5%"
  },
  title:{
    textAlign:"left",
    margin: "20px"
  },
  textfield:{}
}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [disable, setDisable] = useState(true);

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
      <TabPanel value={value} index={0}  className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            ACT Scores
          </Typography>
            <TextField id="ACT_composite" label="ACT Composite" disabled={disable} defaultValue={props.student.ACT_composite} className={classes.textfield}/>
            <TextField id="ACT_english" label="ACT English" disabled={disable} defaultValue={props.student.ACT_english}/>
            <TextField id="ACT_math" label="ACT MATH" disabled={disable} defaultValue={props.student.ACT_math}/>
            <TextField id="ACT_reading" label="ACT Reading" disabled={disable} defaultValue={props.student.ACT_reading}/>
            <TextField id="ACT_science" label="ACT Science" disabled={disable} defaultValue={props.student.ACT_science}/>
   
          <br /> <br /> <br />
          <Divider variant="fullWidth"/>
          <Typography variant="h6" className={classes.title}>
          SAT Scores
          </Typography>
          <TextField id="SAT" label="SAT" disabled={disable} defaultValue={props.student.SAT}/>
          <TextField id="SAT_math" label="SAT MATH" disabled={disable} defaultValue={props.student.SAT_math}/>
          <TextField id="SAT_EBRW" label="SAT EBRW" disabled={disable} defaultValue={props.student.SAT_EBRW}/>
          <TextField id="SAT_literature" label="Literature" disabled={disable} defaultValue={props.student.SAT_literature}/>
          <TextField id="SAT_US_hist" label="US History" disabled={disable} defaultValue={props.student.SAT_US_hist}/>
          <TextField id="SAT_world_hist" label="World History" disabled={disable} defaultValue={props.student.SAT_world_hist}/>
          <TextField id="SAT_math_I" label="Math Subject I" disabled={disable} defaultValue={props.student.SAT_math_I}/>
          <TextField id="SAT_math_II" label="Math Subject II" disabled={disable} defaultValue={props.student.SAT_math_II}/>
          <TextField id="SAT_eco_bio" label="Economic" disabled={disable} defaultValue={props.student.SAT_eco_bio}/>
          <TextField id="SAT_mol_bio" label="Biology" disabled={disable} defaultValue={props.student.SAT_mol_bio}/>
          <TextField id="SAT_chemistry" label="Chemistry" disabled={disable} defaultValue={props.student.SAT_chemistry}/>
          <TextField id="SAT_physics" label="Physics" disabled={disable} defaultValue={props.student.SAT_physics}/>
          
          <Divider variant="fullWidth"/>
          <Typography variant="h6" className={classes.title}>
          AP
          </Typography>
          <TextField id="num_AP_passed" label="AP exams passed" disabled={disable} defaultValue={props.student.num_AP_passed}/>
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