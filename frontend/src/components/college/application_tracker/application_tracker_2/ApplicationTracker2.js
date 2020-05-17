import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import SliderFactory from "./SliderCollegeClass";
import EnhancedTable from "./ViewApplicationsTable";
import CustomizedTables from "./StatisticsTable";
import Switch from "@material-ui/core/Switch";
import ScatterPlot from "./ScatterPlot";
import AutocompleteFilter from "../../../AutocompleteFilter";
import { collegeUrl } from "../../../Url";

export default function ApplicationTracker2(props) {
  const [ lax, setLax ] = useState(true);
  const [ students, setStudents ] = useState([]);
  const [ cur_students, setCurrentStudents ] = useState([]);
  const [ filters, setFilters ] = useState({
    status: [ "accepted", "pending", "denied", "deferred", "waitlisted", "withdrawn" ],
    high_schools: props.schoolSelected,
    college_class: [],
    strict_lax: false
  });


  useEffect(() => {
    getApplications();
  }, []);

  const getApplications = () => {
    axios.get(collegeUrl + props.college + "/applications", {
      responseType: "json",
    })
      .then((response) => {
        setStudents(response.data, () => setFilters({ ...filters, high_schools: props.schoolSelected }))
        setCurrentStudents(filterData(response.data))
      });
  };

  const getHighSchools = () => {
    const uniqueTags = [];
    students.map(img => {
      if (uniqueTags.indexOf(img.high_school_name) === -1) {
        uniqueTags.push(img.high_school_name)
      }
    });
    props.result.map(obj =>{
      if (uniqueTags.indexOf(obj.name) === -1) {
        uniqueTags.push(obj.name)
      }
    })
    return uniqueTags;
  }

  const filter = (name, value) => {
    setFilters({
      ...filters,
      [ name ]: value
    })
  }

  function filterData(temp_students) {
    return temp_students.filter(s => filters[ "status" ].length == 0 || s.status == null || filters[ "status" ].includes(s.status))
    .filter(s => filters[ "high_schools" ].length == 0 || s.high_school_name == null || filters[ "high_schools" ].includes(s.high_school_name))
    .filter(s => filters[ "college_class" ].length == 0 || s.college_class == null || ((s.college_class >= filters[ "college_class" ][ 0 ]) && (s.college_class <= filters[ "college_class" ][ 1 ])))
    .filter(function (temp_student) {
      if (filters[ "strict_lax" ] == true) {
        let res = true;
        Object.keys(temp_student).forEach(y => {
          if (temp_student[ y ] == null) {
            res = false;
          }
        });
        return res;
      } else {
        return true;
      }
    });
  }

  useEffect(() => {
    setCurrentStudents(filterData(students))
  }, [ filters ]);


  const aggregate = (array) => {
    return array.reduce((sum, i) => sum + i, 0) / array.length;
  }

  function FormRow(obj1, obj2) {
    return (
      <Grid container spacing={ 1 }>
        <Grid item xs={ 6 }>
          { obj1 }
        </Grid>
        <Grid item xs={ 6 }>
          { obj2 }
        </Grid>
      </Grid>
    );
  }

  return (
    <div>
      {/* FILTERS START */ }
      { FormRow(
        <AutocompleteFilter id="high_schools" filter={ (v) => filter("high_schools", v) } label="High School" placeholder="Select High School" options={ getHighSchools() } defaultValue={props.schoolSelected} navigate={false}/>,
        <AutocompleteFilter id="status" filter={ (v) => filter("status", v) } label="Application Status" placeholder="Select Status" options={["pending", "accepted", "denied", "deferred", "waitlisted", "withdrawn"]} navigate={false}/>
      ) }
      <br />
      <SliderFactory
        id="college_class"
        filterCollegeClass={ (v) => filter("college_class", v) }
        min={ 2020 }
        max={ 2030 }
        startText={ "College Class" }
        step={ 1 }
      />,
      <div>
        strict
            <Switch
          color="primary"
          checked={ lax }
          onChange={ () => {
            setLax(!lax);
            filter("strict_lax", lax)
          } }
          name="checkedA"
          inputProps={ { "aria-label": "secondary checkbox" } }
        />
            lax
          </div>
      {/* FILTERS END */ }

      {/* TABLES START */ }
      <EnhancedTable students={ cur_students } />
      <br />
      <CustomizedTables SAT_math={ aggregate(cur_students.map(({ SAT_math }) => SAT_math)) }
        SAT_EBRW={ aggregate(cur_students.map(({ SAT_EBRW }) => SAT_EBRW)) }
        GPA={ aggregate(cur_students.map(({ GPA }) => parseFloat(GPA))) }
        ACT={ aggregate(cur_students.map(({ ACT_composite }) => ACT_composite)) }
        SAT_math_accepted={ aggregate(cur_students.filter(item => item.status == "accepted").map(({ SAT_math }) => SAT_math)) }
        SAT_EBRW_accepted={ aggregate(cur_students.filter(item => item.status == "accepted").filter(item => item.status == "accepted").map(({ SAT_EBRW }) => SAT_EBRW)) }
        GPA_accepted={ aggregate(cur_students.filter(item => item.status == "accepted").filter(item => item.status == "accepted").map(({ GPA }) => parseFloat(GPA))) }
        ACT_accepted={ aggregate(cur_students.filter(item => item.status == "accepted").filter(item => item.status == "accepted").map(({ ACT_composite }) => ACT_composite)) } />
      {/* TABLES END */ }
      
      <ScatterPlot students={ cur_students } test={ "ACT_composite" }
        SAT_math={aggregate(cur_students.map(({ SAT_math }) => SAT_math))}
        SAT_EBRW={aggregate(cur_students.map(({ SAT_EBRW }) => SAT_EBRW))}
        GPA={aggregate(cur_students.map(({ GPA }) => parseFloat(GPA)))}
        ACT={aggregate(cur_students.map(({ ACT_composite }) => ACT_composite))}
        SAT_math_accepted={aggregate(cur_students.filter(item => item.status == "accepted").map(({ SAT_math }) => SAT_math))}
        SAT_EBRW_accepted={aggregate(cur_students.filter(item => item.status == "accepted").filter(item => item.status == "accepted").map(({ SAT_EBRW }) => SAT_EBRW))}
        GPA_accepted={aggregate(cur_students.filter(item => item.status == "accepted").filter(item => item.status == "accepted").map(({ GPA }) => parseFloat(GPA)))}
        ACT_accepted={aggregate(cur_students.filter(item => item.status == "accepted").filter(item => item.status == "accepted").map(({ ACT_composite }) => ACT_composite))} 
        />


    </div>
  )

}