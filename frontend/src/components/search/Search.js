import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { useLocation, Link, useHistory, useParams } from "react-router-dom";
import { Grid, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Switch from "@material-ui/core/Switch";
import Tooltip from '@material-ui/core/Tooltip';
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
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";
import Map from "./filters/Map"
import { searchUrl, studentUrl, recommendUrl } from "../Url";

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
    marginTop: "95px"
  },
  recommendation_score: {
    marginTop: "15px",
    width: "60%",
    display: "inline-block",
  },
  sort: {
    marginLeft: "40px"
  },
  above_cards_bar: {
    marginLeft: "60px",
    textAlign: "left",
  },
  pagination: {
    marginTop: "40px",
    marginBottom: "40px",
    marginLeft: "20%"
  }

}));

export default function Search(props) {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const [ colleges, setColleges ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ lax, setLax ] = useState(false);
  const [ RSText, setRSText ] = useState("Compute Recommendation Score");
  const [ RSVariant, setRSVariant ] = useState("contained");
  const [ compute, setCompute ] = useState(false);
  const [ recscores, setRecscores] = useState([])

  useEffect(() => {
    handleSearch(location.search);
  }, [ location.search ]);

  const handleSearch = (query) => {
    setLoading(true);
    axios
      .get(searchUrl + query, {
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
    params[ id ] = value;
    if(params.sort == "recommendationScore"){
      let new_colleges = Object.assign([], colleges); // names
      let new_recscores = Object.assign([], recscores); // ages

      //1) combine the arrays:
      var list = [];
      for (var j = 0; j < new_colleges.length; j++) 
          list.push({'college': new_colleges[j], 'rec_score': new_recscores[j]});

      //2) sort:
      list.sort(function(a, b) {
          return ((a.rec_score < b.rec_score) ? -1 : ((a.rec_score == b.rec_score) ? 0 : 1));
      });

      //3) separate them back out:
      for (var k = 0; k < list.length; k++) {
          new_colleges[k] = list[k].college;
          new_recscores[k] = list[k].rec_score;
      }
      setRecscores(new_recscores)
      setColleges(new_colleges)
    }else if(params.sort == "out_state_cost"){
      let new_colleges = Object.assign([], colleges); // names
      let url = studentUrl+props.user+"/"
      fetch(url).then((data) => {
        if (data.status === 200) {
          async function getData() {
            let object = await data.json();
            var userProfile = await object["student"]
            var residenceState = userProfile["residence_state"]   
            
            // now we have residence state and colleges so we can assign appropriate costs and sort
            var new_cost = []
            console.log(residenceState)
            new_colleges.map((college) => 
              // college["state"] == residenceState ? console.log(college["name"]) : console.log("NO")
              college["state"] == residenceState ? new_cost.push(college["in_state_cost"]) : new_cost.push(college["out_state_cost"])
            );
            console.log(new_colleges)
            console.log(new_cost)

            //1) combine the arrays:
            var list = [];
            for (var j = 0; j < new_colleges.length; j++) 
                list.push({'college': new_colleges[j], 'cost': new_cost[j]});

            //2) sort:
            list.sort(function(a, b) {
                return ((a.cost < b.cost) ? -1 : ((a.cost == b.cost) ? 0 : 1));
            });

            //3) separate them back out:
            for (var k = 0; k < list.length; k++) {
                new_colleges[k] = list[k].college;
            }
            setColleges(new_colleges)

          }
          getData();
        }
      });
    }else{
      history.push(
        "college?" + queryString.stringify(params, { arrayFormat: "comma" })
      );
    }
  }

  const handleRecommend = (query) => {
    setLoading(true)
    const college_names = colleges.map(c => c.name)
    axios
      .get(recommendUrl, {
        responseType: "json",
        params: {
          userid: props.user,
          colleges: JSON.stringify(college_names)
        }
      })
      .then((response) => {
        let new_colleges = Object.assign([], colleges);
        response.data.map((score, index) => { new_colleges[ index ].score = score })
        setRecscores(response.data)
        setColleges(new_colleges, setLoading(false))
      });
  };


  return (
    <Grid
      className={ classes.root }
      container
      spacing={ 2 }
      margins={ 3 }
      justify="center"
    >
      <Grid className={ classes.header } item md={ 12 }></Grid>
      <Grid item md={ 3 } className={ classes.filters }>
        <Map id="states" navigate={navigate}/>
        <Grid container spacing={ 2 }>
          {/* <Grid item md={ 12 }>
            <LocationFilter id="states" navigate={ navigate } />
          </Grid> */}

          <Grid item md={ 12 }>
            <MajorFilter id="majors" navigate={ navigate } />
          </Grid>
          <Divider />

          <Grid item md={ 12 }>
            <SliderFactory
              id="adm_rate"
              navigate={ navigate }
              min={ 0 }
              max={ 1 }
              startText={ "Admission Rate" }
              step={ 0.1 }
            />
          </Grid>
          <Grid item md={ 12 }>
            <SliderFactory
              id="ranking"
              navigate={ navigate }
              min={ 0 }
              max={ 500 }
              startText={ "Ranking" }
              step={ 25 }
            />
          </Grid>
          <Grid item md={ 12 }>
            <SliderFactory
              id="SAT_math"
              navigate={ navigate }
              min={ 200 }
              max={ 800 }
              startText={ "SAT Math" }
              step={ 50 }
            />
          </Grid>
          <Grid item md={ 12 }>
            <SliderFactory
              id="SAT_EBRW"
              navigate={ navigate }
              min={ 200 }
              max={ 800 }
              startText={ "SAT EBRW" }
              step={ 50 }
            />
          </Grid>
          <Grid item md={ 12 }>
            <SliderFactory
              id="ACT_composite"
              navigate={ navigate }
              min={ 1 }
              max={ 36 }
              startText={ "ACT Composite" }
              step={ 2 }
            />
          </Grid>
          <Grid item md={ 12 }>
            <SliderFactory
              id="out_state_cost"
              navigate={ navigate }
              min={ 0 }
              max={ 100000 }
              startText={ "Cost of Attendance" }
              step={ 1000 }
            />
          </Grid>

          <Grid item md={ 12 }>
            <SliderFactory
              id="size"
              navigate={ navigate }
              min={ 0 }
              max={ 40000 }
              startText={ "Size" }
              step={ 2500 }
            />
          </Grid>
          <Grid item md={ 12 }>
            strict
            <Switch
              color="primary"
              checked={ lax }
              onChange={ () => {
                navigate("lax", !lax);
                setLax(!lax);
              } }
              name="checkedA"
              inputProps={ { "aria-label": "secondary checkbox" } }
            />
            lax
          </Grid>
        </Grid>


        {/* right side - colleges */ }
      </Grid>
      <Grid item md={ 8 }>
        <div className={ classes.above_cards_bar }>
          <div className={ classes.recommendation_score }>
            <Tooltip title="The recommendation score is based on where students with similar profiles applied and college ranking." placement="top" arrow>
              <Button
                variant={ RSVariant }
                color="primary"
                className={ classes.button }
                endIcon={ <SyncRoundedIcon /> }
                onClick={ () => {
                  if (RSText == "Compute Recommendation Score") {
                    handleRecommend();
                    setRSText("Hide Recommendation Score");
                    setRSVariant("outlined")
                    setCompute(true)
                  } else {
                    setRSText("Compute Recommendation Score");
                    setRSVariant("contained")
                    setCompute(false)
                  }
                } }
              >
                { RSText }
              </Button>
            </Tooltip>
          </div>
          <SortOptions id="sort" navigate={ navigate } setOrder={ setOrder } />
        </div>

        { loading ? (
          <LinearProgress variant="query" />
        ) : (
            colleges.map((college, index) => <CollegeCard key = {index} college={ college } rec_score={ compute } user={ props.user } />)
          ) }
      </Grid>

      {/* pagination */ }
      {/* <Pagination count={ 10 } color="primary" className={ classes.pagination } /> */}
    </Grid>
  );
}

