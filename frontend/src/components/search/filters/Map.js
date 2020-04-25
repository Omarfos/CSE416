// Normally these would be "import" statements, but this is a simple demo and
// is needed to render in the browser.
import React, { useState, useEffect } from "react";
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

// const { useEffect, useState } = React;
const handleClick = (values) => {
    // let states = values.map((v) => v.code);
    // props.navigate(props.id, states);
};

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);



// Functional component for the SVG map. Take in the map JSON data as a prop and
// return SVG.
const USMap = (props) => {
  const { statesData } = props;
  const northeast = ["ME", "NH", "VT", "MA", "NY", "RI", "CT", "PA", "NJ"]
  const midwest = ["OH", "MI", "IN", "WI", "IL", "MI", "IA", "MO", "ND", "SD", "NE", "KS", "MN"]
  const west = ["MT", "ID", "WY", "CO", "NM", "AZ", "UT", "NV", "CA", "OR", "WA", "AK", "HI"]

  function stateRegion(state_id) {
    let color = "orange"
    northeast.includes(state_id) ? color = "purple" : (midwest.includes(state_id) ? color = "blue" : (west.includes(state_id) ? color="orange" : color="green"))
    return color
  }

  return (
    <svg viewBox="0 0 960 600">
      {statesData.map((stateData, index) =>
      <Tooltip disableFocusListener title={stateData.name}>
        <path
          id={"MyPath"+stateData.id}
          className="someCSSClass"
          style={{cursor: "pointer", fill: stateRegion(stateData.id)}}
          key={index}
          stroke="#fff"
          strokeWidth="6px"
          d={stateData.shape}
        //   onMouseOver={(event) => {
        //     event.target.style.fill = 'red';
        //     console.log("STATE NAME: ")
        //     console.log(stateData.name)
        //     console.log("STATE ABBREV: ")
        //     console.log(stateData.id)
        //   }}
          onClick={(event) => {
            event.target.style.fill == 'red' ? event.target.style.fill = stateRegion(stateData.id) : event.target.style.fill = 'red'
          }}
        //   onMouseOut={(event) => {
        //     event.target.style.fill = 'orange';
        //   }}
        >
        </path>
        </Tooltip>
      )}
      {/* {statesData.map((stateData, index) =>
        <text style={{ fontSize: '30px'}}>
          <textPath href={"#MyPath"+stateData.id}>
              {stateData.id}
          </textPath>
      </text>
      )} */}
    </svg>
  )
}

// Functional component for the app. This handles loading the data and showing
// some sort of loading UI while waiting for the data.
export default function Map(props) {
  // The statesData is null by default until we set it.
  const [statesData, setStatesData] = useState(null);

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  // This should only run once due to the [] arg for the dependencies.
  useEffect(() => {
    (async () => {
      const res = await fetch('https://willhaley.com/assets/united-states-map-react/states.json');
      const statesData = await res.json();
      // Set the statesData with the data received from fetch().
      setStatesData(statesData);
    })();
  }, []);

  // If there is no statesData yet, show a loading indicator.
  if (!statesData) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <USMap statesData={statesData} id={props.id} navigate={props.navigate}/>
      <FormControlLabel
        control={<GreenCheckbox checked={state.checkedG} onChange={handleChange} name="checkedG"/>}
        label="South"
      />
    </div>
  );
}

// // ReactDOM is used to render React in a browser directly. This is not typical
// // and a "normal" React build pipeline should be used for production apps.
// ReactDOM.render(
//   <App />,
//   document.getElementById('demo-app'),
// );