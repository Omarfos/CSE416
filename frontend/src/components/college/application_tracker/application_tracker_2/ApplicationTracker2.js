import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import SliderFactory from "./SliderCollegeClass";
import StatusFilter from "./StatusFilter"
import HighSchoolFilter from "./HighSchoolFilter"
import EnhancedTable from "./ViewApplicationsTable";
import CustomizedTables from "./StatisticsTable";
import Switch from "@material-ui/core/Switch";
import ScatterPlot from "./ScatterPlot";

export default function ApplicationTracker2(props) {
  const [ lax, setLax ] = useState(true);
  const [ students, setStudents ] = useState([]);
  const [ cur_students, setCurrentStudents ] = useState([]);
  const [ filters, setFilters ] = useState({
    status: [ "accepted", "pending", "denied", "defered", "waitlisted", "withdrawn" ],
    high_schools: props.schoolSelected,
    college_class: [],
    strict_lax: false
  });


  useEffect(() => {
    getApplications();
  }, []);

  const getApplications = () => {
    axios.get("http://localhost:8000/college/" + props.college + "/applications", {
      responseType: "json",
    })
      .then((response) => {
        console.log('response', response)
        setStudents(response.data, () => setFilters({ ...filters, high_schools: getHighSchools() }))
        setCurrentStudents(response.data)
      });
  };

  const getHighSchools = () => {
    const uniqueTags = [];
    students.map(img => {
      if (uniqueTags.indexOf(img.high_school_name) === -1) {
        uniqueTags.push(img.high_school_name)
      }
    });
    return uniqueTags;
  }

  const filter = (name, value) => {
    setFilters({
      ...filters,
      [ name ]: value
    })
  }

  useEffect(() => {
    let new_students = students.filter(s => filters[ "status" ].length == 0 || s.status == null || filters[ "status" ].includes(s.status))
      .filter(s => filters[ "high_schools" ].length == 0 || s.high_school_name == null || filters[ "high_schools" ].includes(s.high_school_name))
      .filter(s => filters[ "college_class" ].length == 0 || s.college_class == null || ((s.college_class >= filters[ "college_class" ][ 0 ]) && (s.college_class <= filters[ "college_class" ][ 1 ])))
      .filter(function (student) {
        if (filters[ "strict_lax" ] == true) {
          let res = true;
          Object.keys(student).forEach(y => {
            if (student[ y ] == null) {
              res = false;
            }
          });
          return res;
        } else {
          return true;
        }
      });
    setCurrentStudents(new_students)
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
      { console.log('students', JSON.stringify(students)) }
      {/* FILTERS START */ }
      { FormRow(
        <HighSchoolFilter id="high_schools" filterHighSchool={ (v) => filter("high_schools", v) } allHighSchools={ getHighSchools() } />,
        <StatusFilter id="status" filterStatus={ (v) => filter("status", v) } />
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
      <ScatterPlot students={ students } test={ "ACT_composite" } />


    </div>
  )

}