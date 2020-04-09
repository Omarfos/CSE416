import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import colleges from "../../docs/colleges.json";

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
      height: "70px",
  },
  container:{
    width:"68%",
    marginLeft:"5%",
    textAlign:"left"
  },
  title:{
    textAlign:"left",
    margin: "20px"
  },
  textfield:{
    margin: "20px"
  },
  title2:{
    textAlign:"left",
    marginTop: "20px",
    marginLeft:"20px"
  },
  resize:{
    fontSize:"1.2vw",
  },
  button:{
    textDecoration: "none",
    color: "#8493d3",
    fontSize: 18,
    padding: "15px",
    "&:hover": {
      background: "hsla(240, 48%, 41%, 0.1)",
      color: "#5d6896",
    },
  },
  buttonDiv:{
    textAlign:"right",
    margin:"20px"
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
      <Tabs orientation="vertical" value={value} onChange={handleChange} aria-label="Vertical tabs example" className={classes.tabs}>
        <Tab label="Score" {...a11yProps(0)} className={classes.tab}/>
        <Tab label="High School" {...a11yProps(1)} className={classes.tab}/>
        <Tab label="College" {...a11yProps(2)} className={classes.tab}/>
        <Tab label="Account Setting" {...a11yProps(3)} className={classes.tab}/>
      </Tabs>
      <div className={classes.container}>
        <TabPanel value={value} index={0} >
          <Typography variant="h6" className={classes.title}>
            ACT Scores
          </Typography>
            <TextField id="ACT_composite" label="ACT Composite" disabled={props.disable} defaultValue={props.student.ACT_composite} className={classes.textfield} type="number" variant="outlined" InputProps={{classes: {input: classes.resize}}}/>
            <br />
            <TextField id="ACT_english" label="ACT English" disabled={props.disable} defaultValue={props.student.ACT_english} type="number" variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
            <TextField id="ACT_math" label="ACT MATH" disabled={props.disable} defaultValue={props.student.ACT_math} type="number" variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
            <TextField id="ACT_reading" label="ACT Reading" disabled={props.disable} defaultValue={props.student.ACT_reading} type="number" variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
            <TextField id="ACT_science" label="ACT Science" disabled={props.disable} defaultValue={props.student.ACT_science} type="number" variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
   
          <br /> <br /> <br />
          <Divider variant="fullWidth"/>
          <Typography variant="h6" className={classes.title}>
          SAT Scores
          </Typography>
          <TextField id="SAT" label="SAT" disabled={props.disable} defaultValue={props.student.SAT} type="number" variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
          <br />
          <TextField id="SAT_math" label="SAT MATH" disabled={props.disable} defaultValue={props.student.SAT_math} type="number" variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
          <TextField id="SAT_EBRW" label="SAT EBRW" disabled={props.disable} defaultValue={props.student.SAT_EBRW} type="number" variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
         
          <Typography variant="h6" className={classes.title}>
          SAT Subject Test
          </Typography>

          <TextField id="SAT_literature" label="Literature" disabled={props.disable} defaultValue={props.student.SAT_literature} type="number" variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
          <TextField id="SAT_US_hist" label="US History" disabled={props.disable} defaultValue={props.student.SAT_US_hist} type="number" variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
          <TextField id="SAT_world_hist" label="World History" disabled={props.disable} defaultValue={props.student.SAT_world_hist} type="number" variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
          <TextField id="SAT_math_I" label="Math Subject I" disabled={props.disable} defaultValue={props.student.SAT_math_I} type="number" variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
          <TextField id="SAT_math_II" label="Math Subject II" disabled={props.disable} defaultValue={props.student.SAT_math_II} type="number" variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
          <TextField id="SAT_eco_bio" label="Economic" disabled={props.disable} defaultValue={props.student.SAT_eco_bio} type="number" variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
          <TextField id="SAT_mol_bio" label="Biology" disabled={props.disable} defaultValue={props.student.SAT_mol_bio} type="number" variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
          <TextField id="SAT_chemistry" label="Chemistry" disabled={props.disable} defaultValue={props.student.SAT_chemistry} type="number" variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
          <TextField id="SAT_physics" label="Physics" disabled={props.disable} defaultValue={props.student.SAT_physics} type="number" variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
          
          <br /> <br /> <br />
          <Divider variant="fullWidth"/>
          <Typography variant="h6" className={classes.title}>
          AP
          </Typography>
          <TextField id="num_AP_passed" label="AP exams passed" disabled={props.disable} defaultValue={props.student.num_AP_passed} type="number" variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
          <br /><br /> <br />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Typography variant="h6" className={classes.title2}>
            High School Name:
          </Typography>
          <TextField id="high_school_name" disabled={props.disable} defaultValue={props.student.high_school_name} variant="outlined" fullWidth className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
          <br /><br />
          <Typography variant="h6" className={classes.title2}>
            Location: 
          </Typography>
          <TextField id="high_school_city" label="City" disabled={props.disable} defaultValue={props.student.high_school_city} variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
          <TextField id="high_school_state" label="State" disabled={props.disable} defaultValue={props.student.high_school_state} variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
          <br /><br />
          
          <Typography variant="h6" className={classes.title2}>
          GPA: 
          </Typography>
          <TextField id="GPA" disabled={props.disable} defaultValue={props.student.GPA} variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
        </TabPanel>
        
        <TabPanel value={value} index={2}>
          <Typography variant="h6" className={classes.title2}>
          Class of:
          </Typography>
          <TextField id="college_class" disabled={props.disable} defaultValue={props.student.college_class} variant="outlined" type = "number" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
          <br /><br /><br />

          <Typography variant="h6" className={classes.title2}>
          Interested Majors: 
          </Typography>
          <TextField id="major_1" label="1" disabled={props.disable} defaultValue={props.student.major_1} variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}} fullWidth/>
          <TextField id="major_2" label="2" disabled={props.disable} defaultValue={props.student.major_2} variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}} fullWidth/>
          <br /><br /><br />

          {props.application &&
            <div>
              <Typography variant="h6" className={classes.title2}>
              Colleges Applied: 
              </Typography>
             <AppliedCollege />
            </div>
          }
          
          
          
          
         
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Typography variant="h6" className={classes.title2}>
          User Email
          </Typography>
          <TextField id="major_1" disabled defaultValue="NULL" variant="outlined" className={classes.textfield} InputProps={{classes: {input: classes.resize}}}/>
          
          change password
        </TabPanel>
        {!props.disable &&
              <div className = {classes.buttonDiv}>
                <Button type="submit" className={classes.button} variant="outlined">Update Profile</Button>
              </div>
        }
      </div>
    </div>
  );
}
function AppliedCollege(){
  
}


