import React, { useState, useEffect, Component } from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({ 
  root: {
        color: props => props.color,
        '&$checked': {
          color: props => props.color,
        },
      },
      checked: {},
});

const RegionCheckbox = ((props) => {
  const classes = useStyles({color: props.color});
  return <Checkbox color="default" className={classes.root} {...props} />
});

// export default function Map(props) {
export default function Map(props) {
  // The statesData is null by default until we set it.
  const [statesData, setStatesData] = useState(null);
  const northeast = ["ME", "NH", "VT", "MA", "NY", "RI", "CT", "PA", "NJ"]
  const midwest = ["OH", "MI", "IN", "WI", "IL", "MI", "IA", "MO", "ND", "SD", "NE", "KS", "MN"]
  const west = ["MT", "ID", "WY", "CO", "NM", "AZ", "UT", "NV", "CA", "OR", "WA", "AK", "HI"]
  const south = ["TX", "OK", "AR", "LA", "MS", "AL", "TN", "GA", "FL", "KY", "SC", "NC", "VA", "WV"]
  const [ selectedStates, setSelectedStates ] = useState([]);

  const [state, setState] = React.useState({
    checkedSouth: false,
    checkedWest: false,
    checkedNortheast: false,
    checkedMidwest: false,
  });

  useEffect(() => {
    props.navigate(props.id, selectedStates)
    console.log(selectedStates)
  }, [ selectedStates ]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    var checkedName = event.target.name
    var checkdeStatus = event.target.checked
    if(checkdeStatus == false){
      switch(checkedName){
        case "checkedWest":
          console.log("filtering west")
          setSelectedStates(selectedStates.filter(item => !west.includes(item)))
          break;
        case "checkedMidwest":
          setSelectedStates(selectedStates.filter(item => !midwest.includes(item)))
          break;
        case "checkedNortheast":
          setSelectedStates(selectedStates.filter(item => !northeast.includes(item)))
          break;
        default:
          setSelectedStates(selectedStates.filter(item => !south.includes(item)))
      }
    }else{
      console.log(checkedName)
      switch(checkedName){
        case "checkedWest":
          console.log("adding west")
          document.getElementById("MyPathNY").style.fill = "red"
          setSelectedStates(Array.from(new Set(selectedStates.concat(west))))
          break;
        case "checkedMidwest":
          setSelectedStates(Array.from(new Set(selectedStates.concat(midwest))))
          break;
        case "checkedNortheast":
          setSelectedStates(Array.from(new Set(selectedStates.concat(northeast))))
          break;
        default:
          setSelectedStates(Array.from(new Set(selectedStates.concat(south))))
      }
      
    }
  };

  function stateRegion(state_id) {
    let color = "orange"
    northeast.includes(state_id) ? color = "purple" : (midwest.includes(state_id) ? color = "blue" : (west.includes(state_id) ? color="orange" : color="green"))
    return color
  }

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
            onClick={(event) => {
              var color = event.target.style.fill
              if(color == 'red'){
                console.log(event)
                event.target.style.fill = stateRegion(stateData.id)
                setSelectedStates(selectedStates.filter(item => item != stateData.id))
              }else{
                event.target.style.fill = 'red'
                if(!selectedStates.includes(stateData.id)){
                  setSelectedStates(selectedStates.concat(stateData.id))
                }
              }
              console.log("ALL SELECTED STATES ARE:")
              console.log(selectedStates)
            }}
          >
          </path>
          </Tooltip>
        )}
      </svg>
      <div>
        <FormControlLabel
          control={<RegionCheckbox checked={state.checkedWest} onChange={handleChange} name="checkedWest" color="#FFA502"/>}
          label="West"
        />
        <FormControlLabel
          control={<RegionCheckbox checked={state.checkedSouth} onChange={handleChange} name="checkedSouth" color="#008001"/>}
          label="South"
        />
      </div>
      <div>
        <FormControlLabel
          control={<RegionCheckbox checked={state.checkedMidwest} onChange={handleChange} name="checkedMidwest" color="#1700FF"/>}
          label="Midwest"
        />
        <FormControlLabel
          control={<RegionCheckbox checked={state.checkedNortheast} onChange={handleChange} name="checkedNortheast" color="#800080"/>}
          label="Northeast"
        />
      </div>
    </div>
  );
}