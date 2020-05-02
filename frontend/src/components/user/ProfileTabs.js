import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import DropDownSelection from "./SelectionDropdown";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import collegeName from "./colleges.json";
import highSchoolName from "./highSchools.json";


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
    width:"20%",
  },
  tab: {
    fontSize: "1.3vw",
    height: "70px",
  },
  container: {
    width: "68%",
    marginLeft: "5%",
    textAlign: "left"
  },
  title: {
    textAlign: "left",
    marginTop: "20px",
    marginBottom: "20px",
    marginRight: "40px",
  },
  textfield: {
    marginTop: "20px",
    marginBottom: "20px",
    marginRight: "40px",
  },
  title2: {
    textAlign: "left",
    marginTop: "20px",
  },
  resize: {
    fontSize: "1.2vw",
  },
  button: {
    textDecoration: "none",
    color: "#8493d3",
    fontSize: 18,
    padding: "15px",
    "&:hover": {
      background: "hsla(240, 48%, 41%, 0.1)",
      color: "#5d6896",
    },
  },
  buttonDiv: {
    textAlign: "right",
    margin: "20px",
    float: "right"
  },
  addButton: {
    color: "green"
  },
  removeButtonDiv: {
    marginTop: "23px",
    marginLeft: "20px"
  },
  removeButton: {
    color: "red"
  },
  float: {
    float: "right",
    marginTop: "15px",
    marginRight: "15px"
  },
  statusDropdown: {
    marginTop: "10px",
    marginBottom: "20px",
    marginRight: "40px",
  }
}));


export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function handleRemoveCollege(id) {
    const newlist = [].concat(props.application);
    newlist.splice(id, 1);
    props.setApplication(newlist);
  }

  async function handleEditCollege(value, index) {
    const newlist = [].concat(props.application);
    newlist[index].college = value;
    props.setApplication(newlist);
  }
  async function handleEditHighSchool(value, index){
    props.setStudent({ ...props.student, ["high_school_name"]: value})
  }

  async function handleAddApplication() {
    let newApp = props.application.concat([{ college: "", status: "", questionable: false }]);
    props.setApplication(newApp);
  }

  async function handleStatusChange(event, index) {
    const newlist = [].concat(props.application);
    newlist[index].status = event.target.value;
    props.setApplication(newlist);
  }

  return (
    <div className={classes.root}>
      <Tabs orientation="vertical" value={value} onChange={handleChange} aria-label="Vertical tabs example" className={classes.tabs}>
        <Tab label="Score" {...a11yProps(0)} className={classes.tab} />
        <Tab label="High School" {...a11yProps(1)} className={classes.tab} />
        <Tab label="College" {...a11yProps(2)} className={classes.tab} />
    {/* <Tab label="Account Setting" {...a11yProps(3)} className={classes.tab} /> */}
      </Tabs>
      <div className={classes.container}>
        <TabPanel value={value} index={0} >
          <Typography variant="h6" className={classes.title}>
            ACT Scores
          </Typography>
          <TextField id="ACT_composite" label="ACT Composite"
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: Number(e.target.value) })}
            disabled={props.disable} defaultValue={props.student.ACT_composite} className={classes.textfield} type="number" variant="outlined" InputProps={{ classes: { input: classes.resize } }} />
          <br />
          <TextField id="ACT_English" label="ACT English"
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: Number(e.target.value) })}
            disabled={props.disable} defaultValue={props.student.ACT_English} type="number" variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />
          <TextField id="ACT_math" label="ACT MATH" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: Number(e.target.value) })}
            disabled={props.disable} defaultValue={props.student.ACT_math} type="number" variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />
          <TextField id="ACT_reading" label="ACT Reading" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: Number(e.target.value) })}
            disabled={props.disable} defaultValue={props.student.ACT_reading} type="number" variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />
          <TextField id="ACT_science" label="ACT Science" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: Number(e.target.value) })}
            disabled={props.disable} defaultValue={props.student.ACT_science} type="number" variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />

          <br /> <br /> <br />
          <Divider variant="fullWidth" />
          <Typography variant="h6" className={classes.title}>
            SAT Scores
          </Typography>
          <TextField id="SAT" label="SAT" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: Number(e.target.value) })}
            disabled={props.disable} defaultValue={props.student.SAT} type="number" variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />
          <br />
          <TextField id="SAT_math" label="SAT MATH" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: Number(e.target.value) })}
            disabled={props.disable} defaultValue={props.student.SAT_math} type="number" variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />
          <TextField id="SAT_EBRW" label="SAT EBRW" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: Number(e.target.value) })}
            disabled={props.disable} defaultValue={props.student.SAT_EBRW} type="number" variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />

          <Typography variant="h6" className={classes.title}>
            SAT Subject Test
          </Typography>
          <TextField id="SAT_literature" label="Literature" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: Number(e.target.value) })}
            disabled={props.disable} defaultValue={props.student.SAT_literature} type="number" variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />
          <TextField id="SAT_US_hist" label="US History" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: Number(e.target.value) })}
            disabled={props.disable} defaultValue={props.student.SAT_US_hist} type="number" variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />
          <TextField id="SAT_world_hist" label="World History" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: Number(e.target.value) })}
            disabled={props.disable} defaultValue={props.student.SAT_world_hist} type="number" variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />
          <TextField id="SAT_math_I" label="Math Subject I" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: Number(e.target.value) })}
            disabled={props.disable} defaultValue={props.student.SAT_math_I} type="number" variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />
          <TextField id="SAT_math_II" label="Math Subject II" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: Number(e.target.value) })}
            disabled={props.disable} defaultValue={props.student.SAT_math_II} type="number" variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />
          <TextField id="SAT_eco_bio" label="Economic" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: Number(e.target.value) })}
            disabled={props.disable} defaultValue={props.student.SAT_eco_bio} type="number" variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />
          <TextField id="SAT_mol_bio" label="Biology" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: Number(e.target.value) })}
            disabled={props.disable} defaultValue={props.student.SAT_mol_bio} type="number" variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />
          <TextField id="SAT_chemistry" label="Chemistry" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: Number(e.target.value) })}
            disabled={props.disable} defaultValue={props.student.SAT_chemistry} type="number" variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />
          <TextField id="SAT_physics" label="Physics" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: Number(e.target.value) })}
            disabled={props.disable} defaultValue={props.student.SAT_physics} type="number" variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />

          <br /> <br /> <br />
          <Divider variant="fullWidth" />
          <Typography variant="h6" className={classes.title}>
            AP
          </Typography>
          <TextField id="num_AP_passed" label="AP exams passed" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: Number(e.target.value) })}
            disabled={props.disable} defaultValue={props.student.num_AP_passed} type="number" variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />
          <br /><br /> <br />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Typography variant="h6" className={classes.title2}>
            High School Name:
          </Typography>
          <DropDownSelection value={props.student.high_school_name?props.student.high_school_name: ""} disable={props.disable} handleEditValue={handleEditHighSchool} type="highSchoolName" valueName = {highSchoolName} placeholder = "High School Name"/>

          
          
          <br /><br />
          <Typography variant="h6" className={classes.title2}>
            Location: 
          </Typography>
          <TextField id="high_school_city" label="City" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: e.target.value})}
            disabled={props.disable} defaultValue={props.student.high_school_city} variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />
          <TextField id="high_school_state" label="State" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: e.target.value})}
            disabled={props.disable} defaultValue={props.student.high_school_state} variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />
          <br /><br />

          <Typography variant="h6" className={classes.title2}>
            GPA:
          </Typography>
          <TextField id="GPA" 
          onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: e.target.value})}
          disabled={props.disable} defaultValue={props.student.GPA} variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Typography variant="h6" className={classes.title2}>
            Class of:
          </Typography>
          <TextField id="college_class" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: Number(e.target.value)})}
            disabled={props.disable} defaultValue={props.student.college_class} variant="outlined" type="number" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />
          <br /><br /><br />

          <Typography variant="h6" className={classes.title2}>
            Interested Majors:
          </Typography>
          <TextField id="major_1" label="1" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: e.target.value})}
            disabled={props.disable} defaultValue={props.student.major_1} variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} fullWidth />
          <TextField id="major_2" label="2" 
            onChange={(e) => props.setStudent({ ...props.student, [e.target.id]: e.target.value})}
            disabled={props.disable} defaultValue={props.student.major_2} variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} fullWidth />
          <br /><br /><br />


          <div>
            <Typography variant="h6" className={classes.title2}>
              Colleges Applied:
            </Typography>
            {props.application.length > 0 &&
              <div>
                {props.application.map((app, key) => (
                  <AppliedCollege application={app} key={key} keyID={key} disable={props.disable} handleRemoveCollege={handleRemoveCollege} handleEditCollege={handleEditCollege} handleStatusChange={handleStatusChange} />
                ))}
              </div>
            }
            {props.application.length == 0 &&
              <Typography variant="h6" className={classes.title2}>
                NONE
              </Typography>
            }
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            {!props.disable &&
              <div className={classes.buttonDiv}>
                <Tooltip title="Add more college application">
                  <IconButton onClick={handleAddApplication}>
                    <Icon className={classes.addButton}>add_circle</Icon>
                  </IconButton>
                </Tooltip>
              </div>
            }
            <br /> <br /><br /> <br />
          </div>

        </TabPanel>
        <TabPanel value={value} index={3}>
          <Typography variant="h6" className={classes.title2}>
            User Email
          </Typography>
          <TextField id="major_1" disabled defaultValue="NULL" variant="outlined" className={classes.textfield} InputProps={{ classes: { input: classes.resize } }} />

          change password
        </TabPanel>
        {!props.disable &&
          <div className={classes.buttonDiv}>
            <Button type="submit" className={classes.button} variant="outlined">Update Profile</Button>
          </div>
        }
      </div>
    </div>
  );
}

function AppliedCollege(props) {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.title2}>
        {props.keyID + 1}:
      </Typography>

      <DropDownSelection value={props.application.college} keyID={props.keyID} disable={props.disable} handleEditValue={props.handleEditCollege} type="collegeName" valueName = {collegeName} placeholder = "College Name"/>

      <FormControl className={classes.statusDropdown}>
        <InputLabel shrink htmlFor="status" >
          Status
        </InputLabel>
        <Select
          disabled={props.disable}
          value={props.application.status}
          onChange={(e) => { props.handleStatusChange(e, props.keyID) }}
          inputProps={{
            name: 'status',
            id: 'status',
          }}
        >
          <MenuItem value="withdrawn">withdrawn</MenuItem>
          <MenuItem value="pending">pending</MenuItem>
          <MenuItem value="waitlisted">waitlisted</MenuItem>
          <MenuItem value="denied">denied</MenuItem>
          <MenuItem value="deferred">deferred</MenuItem>
          <MenuItem value="accepted">accepted</MenuItem>

        </Select>
      </FormControl>

      <FormControlLabel className={classes.removeButtonDiv} control={<Checkbox color="primary" disabled checked={props.application.questionable} />} label="Questionable" labelPlacement="start" />
      <div className={classes.float}>
        {!props.disable &&
          <Tooltip title="Delete this college application. Nothing will be saved until clicking 'update profile'">
            <IconButton id={props.keyID} onClick={() => props.handleRemoveCollege(props.keyID)}>
              <DeleteIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        }
      </div>
      <br /><br />
      <Divider variant="fullWidth" />
    </div>
  );
}


