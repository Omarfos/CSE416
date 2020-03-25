import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ApplicationTracker from '../college/ApplicationTracker';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },

  tabs:{
    backgroundColor: "white",
    color:"rgb(80,81,85)",
  }
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
        <AppBar position="static">
            <Tabs className={classes.tabs} centered value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab className={classes.tab}  label="Overview" {...a11yProps(0)}/>
            <Tab className={classes.tab}  label="Majors" {...a11yProps(1)}/>
            <Tab className={classes.tab}  label="Admissions" {...a11yProps(2)}/>
            <Tab className={classes.tab} label="Campus Life" {...a11yProps(3)}/>
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <br />Early Action Availability
            <br />Early Decision Availability
            <br />Admission deadline
            <br />Average GPA:
            <br />SAT MATH: {props.college.SAT_math}
            <br />SAT EBRW: {props.college.SAT_EBRW}
            <br />ACT: {props.college.ACT_composite}
            <br />Detail Enrollment: (%male, %female) (number of undergrad, grad)
        </TabPanel>
        <TabPanel value={value} index={1}>
            Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
            <br />Admission Rate: {props.college.adm_rate}
            <ApplicationTracker/>
        </TabPanel>
        <TabPanel value={value} index={3}>
            <br />Nearest Metropolitan Area
            <br />Freshman Housing Guarantee
            <br />Students in College Housing
            <br />Mascot
            <br />Student body (%American, %Asian, %Black..., %International)
        </TabPanel>
    </div>
  );
}
