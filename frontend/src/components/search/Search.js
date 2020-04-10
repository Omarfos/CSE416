import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { useLocation, Link, useHistory, useParams } from "react-router-dom";
import { Grid, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Switch from "@material-ui/core/Switch";

import CollegeCard from "./CollegeCard";
import Pagination from "@material-ui/lab/Pagination";
import SortOptions from "./Sorting.js";
import LocationFilter from "./filters/LocationFilter";
import MajorFilter from "./filters/MajorFilter";
import SizeFilter from "./filters/SizeFilter";
import SliderFactory from "./filters/SliderFactory";
import LinearProgress from "@material-ui/core/LinearProgress";
import Image from "../../images/header.png";
import SyncRoundedIcon from "@material-ui/icons/SyncRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: "auto"
    backgroundColor: "rgb(241,247,251)",
  },
  header: {
    height: 200,
    backgroundImage: "url(" + Image + ")",
    backgroundSize: "cover",
  },
  filters: {
      marginTop: "125px"
  },
  recommendation_score: {
    marginTop: "15px"
  },
  sort: {
    marginLeft: "40px"
  },
  above_cards_bar: {
    marginLeft: "60px"
  }
}));

export default function Search(props) {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lax, setLax] = useState(false);
  const [RSText, setRSText] = useState("Compute Recommendation Score");
  const [RSVariant, setRSVariant] = useState("contained");
  const [compute, setCompute] = useState(false);

  useEffect(() => {
    handleSearch(location.search);
  }, [location.search]);

  const handleSearch = (query) => {
    setLoading(true);
    console.log("query", query);
    axios
      .get("http://localhost:8000/search" + query, {
        responseType: "json",
      })
      .then((response) => {
        setColleges(
          response.data.map((c) => {
            return c.fields;
          })
        );
      });
    setLoading(false);
  };

  const setOrder = () => {
    setLoading(true);
    setColleges(colleges.slice().reverse());
    setLoading(false);
  };

  const navigate = (id, value) => {
    const params = queryString.parse(location.search, { arrayFormat: "comma" });
    params[id] = value;
    history.push(
      "college?" + queryString.stringify(params, { arrayFormat: "comma" })
    );
  };

  // const handleRSButtonClick = (e) => {
  //   console.log("clicked")
  // };

  return (
    <Grid
      className={classes.root}
      container
      spacing={2}
      margins={3}
      justify="center"
    >
      <Grid className={classes.header} item md={12}></Grid>
      <Grid item md={2} className={classes.filters}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <LocationFilter id="states" navigate={navigate} />
          </Grid>

          <Grid item md={12}>
            <MajorFilter id="majors" navigate={navigate} />
          </Grid>
          <Divider />

          <Grid item md={12}>
            <SliderFactory
              id="adm_rate"
              navigate={navigate}
              min={0}
              max={1}
              startText={"Admission Rate"}
              step={0.1}
            />
          </Grid>
          <Grid item md={12}>
            <SliderFactory
              id="ranking"
              navigate={navigate}
              min={0}
              max={500}
              startText={"Ranking"}
              step={25}
            />
          </Grid>
          <Grid item md={12}>
            <SliderFactory
              id="SAT_math"
              navigate={navigate}
              min={200}
              max={800}
              startText={"SAT Math"}
              step={50}
            />
          </Grid>
          <Grid item md={12}>
            <SliderFactory
              id="SAT_EBRW"
              navigate={navigate}
              min={200}
              max={800}
              startText={"SAT EBRW"}
              step={50}
            />
          </Grid>
          <Grid item md={12}>
            <SliderFactory
              id="ACT_composite"
              navigate={navigate}
              min={1}
              max={36}
              startText={"ACT Composite"}
              step={2}
            />
          </Grid>
          <Grid item md={12}>
            <SliderFactory
              id="out_state_cost"
              navigate={navigate}
              min={0}
              max={100000}
              startText={"Cost of Attendance"}
              step={1000}
            />
          </Grid>

          <Grid item md={12}>
            <SliderFactory
              id="size"
              navigate={navigate}
              min={0}
              max={40000}
              startText={"Size"}
              step={2500}
            />
          </Grid>
          <Grid item md={12}>
            strict
            <Switch
              color="primary"
              checked={lax}
              onChange={() => {
                navigate("lax", !lax);
                setLax(!lax);
              }}
              name="checkedA"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
            lax
          </Grid>
        </Grid>


        {/* right side - colleges */}
      </Grid>
      <Grid item md={8}>
        <Grid container className={classes.above_cards_bar}>
          <Grid item md={8} className={classes.recommendation_score} align = "left">
            <Button
              variant={RSVariant}
              color="primary"
              className={classes.button}
              endIcon={<SyncRoundedIcon />}
              onClick={() => {
                if (RSText=="Compute Recommendation Score"){
                  setRSText("Hide Recommendation Score");
                  setRSVariant("outlined")
                  setCompute(true)
                }else{
                  setRSText("Compute Recommendation Score");
                  setRSVariant("contained")
                  setCompute(false)
                }
              }}
            >
              {RSText}
            </Button>
          </Grid>
          <Grid item md={3} align = "right" className={classes.sort}>
            <SortOptions id="sort" navigate={navigate} setOrder={setOrder} />
          </Grid>
        </Grid>

        {loading ? (
          <LinearProgress variant="query" />
        ) : (
          colleges.map((college) => <CollegeCard college={college} rec_score={compute} />)
        )}
      </Grid>

      {/* pagination */}
      {/* <Pagination count={10} color="primary" className={classes.pagination} /> */}
    </Grid>
  );
}

