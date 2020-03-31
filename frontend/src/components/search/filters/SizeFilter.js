import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import queryString from "query-string";
import { useLocation, Link, useHistory, useParams } from "react-router-dom";

export default function SizeFilter(props) {
  const location = useLocation();

  useEffect(() => {
    const params = queryString.parse(location.search, { arrayFormat: "comma" });
    if (!params[props.id]) return;
    let size = Number(params[props.id][0]);
    if (size < 5000) setChecked({ small: true });
    else if (size < 15000) setChecked({ medium: true });
    else setChecked({ large: true });
  }, []);

  const [checkedSizes, setChecked] = useState({
    small: false,
    medium: false,
    large: false,
  });

  const handleSizeChange = (e) => {
    const { checked, name } = e.target;
    setChecked({ ...checkedSizes, [name]: checked });
    let newSize;
    if (!checked) {
      newSize = [0, 100000];
    } else {
      switch (name) {
        case "small":
          newSize = [0, 5000];
          break;
        case "medium":
          newSize = [5000, 15000];
          break;
        case "large":
          newSize = [15000, 100000];
      }
    }
    props.navigate(props.id, newSize);
  };

  return (
    <>
      <Typography id="size-checkbox" gutterBottom align="left">
        Size
      </Typography>
      <FormGroup column>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedSizes.small}
              onChange={(e) => handleSizeChange(e)}
              name="small"
              color="primary"
            />
          }
          label="Small"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedSizes.medium}
              onChange={(e) => handleSizeChange(e)}
              name="medium"
              color="primary"
            />
          }
          label="Medium "
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedSizes.large}
              onChange={(e) => handleSizeChange(e)}
              name="large"
              color="primary"
            />
          }
          label="Large"
        />
      </FormGroup>
    </>
  );
}
