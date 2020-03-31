import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import queryString from "query-string";
import { useLocation, Link, useHistory, useParams } from "react-router-dom";

export default function SliderFactory(props) {
  const [value, setValue] = useState([]);
  const location = useLocation();

  // on load, set slider values according to url
  useEffect(() => {
    const params = queryString.parse(location.search, { arrayFormat: "comma" });
    if (!params[props.id]) setValue([props.min, props.max]);
    else setValue(params[props.id].map((p) => Number(p)));
  }, []);

  return (
    <>
      <Typography id="range-slider" gutterBottom align="left">
        {props.startText}
      </Typography>
      <Slider
        value={value}
        onChange={(e, v) => {
          setValue(v);
        }}
        onChangeCommitted={(e) => {
          props.navigate(props.id, value);
        }}
        valueLabelDisplay="auto"
        min={props.min}
        max={props.max}
        step={props.step}
      />
    </>
  );
}
