import React, { useState, useEffect } from 'react'
import Plot from "react-plotly.js";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

function ScatterPlot(props) {
    const { students } = props
    const [ test, setTest ] = useState("ACT_composite")

    const initState = {
        ACT_composite: { 
            avg: Math.round(props.ACT),
            avg_accepted: Math.round(props.ACT_accepted),
        },
        SAT_math: {
            avg: Math.round(props.SAT_math),
            avg_accepted: Math.round(props.SAT_math_accepted),
        },
        SAT_ebrw: {
            avg: Math.round(props.SAT_EBRW),
            avg_accepted: Math.round(props.SAT_EBRW_accepted),
        },
        GPA: {
            avg: Math.round(props.GPA * 100) / 100,
            avg_accepted: Math.round(props.GPA_accepted * 100) / 100,
        },
        WA_SAT: {
            avg: Math.round(props.WA_SAT),
            avg_accepted: Math.round(props.WA_SAT_accepted),
        },
    };
    const [filters, setFilters] = useState(initState)

    useEffect(() => {
        setFilters({ ...filters, 
            ACT_composite: {
                avg: Math.round(props.ACT),
                avg_accepted: Math.round(props.ACT_accepted),
            },
            SAT_math: {
                avg: Math.round(props.SAT_math),
                avg_accepted: Math.round(props.SAT_math_accepted),
            },
            SAT_ebrw: {
                avg: Math.round(props.SAT_EBRW),
                avg_accepted: Math.round(props.SAT_EBRW_accepted),
            },
            GPA: {
                avg: Math.round(props.GPA * 100) / 100,
                avg_accepted: Math.round(props.GPA_accepted * 100) / 100,
            },
            WA_SAT: {
                avg: Math.round(props.WA_SAT),
                avg_accepted: Math.round(props.WA_SAT_accepted),
            },
        })
    }, [students, props.GPA, props.GPA_accepted, props.ACT, props.ACT_accepted, props.SAT_EBRW, props.SAT_EBRW_accepted, props.SAT_math, props.SAT_math_accepted])

    const aggregate = (array) => {
        return array.reduce((sum, i) => sum + i, 0) / array.length;
    }

    function computeWA_SAT() {
        students.map(student => {
            let result = 0;
            let weights = 0;
            Object.keys(student).forEach(y => {
                if (y.substring(0,4)=="SAT_" && y != "SAT_math" && y!= "SAT_EBRW" && student[ y ] != null) {
                  result += 0.05 * (student[y] / 800);
                  weights += 0.05;
                }
            });
            if(student.SAT != null && student.ACT_composite != null){
                result += (1-weights)/2 * (student.SAT / 1600 + student.ACT_composite / 36)
                weights = 1;
            }else if(student.SAT != null){
                result += (1-weights) * student.SAT / 1600;
                weights = 1;
            }else if(student.ACT_composite != null){
                result += (1-weights) * student.ACT_composite / 36;
                weights = 1;
            }
            result = Math.round(result/weights * 100)
            student.WA_SAT = result;
        });
        
        // console.log("Students are")
        // console.log(students)
        // // if (students[0].WA_SAT != 0){
        // let wa_avg = aggregate(students.map(({ WA_SAT }) => WA_SAT))
        // let wa_avg_accepted = aggregate(students.filter(item => item.status == "accepted").map(({ WA_SAT }) => WA_SAT))

        // console.log("The WA_avg is ", wa_avg)
        // console.log("The WA_avg_accepted is ", wa_avg_accepted)
        // setWA_avg(wa_avg)
        // setWA_avg_acc(wa_avg_acc)
        // }
        // setFilters({
        //     ...filters, 
        //     WA_SAT: {
        //         avg: aggregate(students.map(({ WA_SAT }) => WA_SAT)),
        //         avg_accepted: aggregate(students.filter(item => item.status == "accepted").map(({ WA_SAT }) => WA_SAT)),
        //     },
        // })
    };

    computeWA_SAT();

    return (
        console.log("filters is"),
        console.log(filters),
        <>
            <Plot
                data={ [
                    {
                        x: [filters[test].avg - 3, filters[test].avg + 3],
                        y: [filters.GPA.avg, filters.GPA.avg ],
                        mode: 'lines',
                        marker: { color: "yellow" },
                        name: 'Lines',
                        line: {
                            dash: 'dashdot',
                            width: 4
                        }
                    },
                    {   
                        x: [filters[test].avg, filters[test].avg],
                        y: [filters.GPA.avg - 2, filters.GPA.avg + 2], 
                        mode: 'lines',
                        marker: { color: "yellow" },
                        name: 'Lines',
                        line: {
                            dash: 'dashdot',
                            width: 4
                        }
                    },

                    {
                        x: [filters[test].avg_accepted - 3, filters[test].avg_accepted + 3],
                        y: [filters.GPA.avg_accepted, filters.GPA.avg_accepted],
                        mode: 'lines',
                        marker: { color: "00FFFB" },
                        name: 'Lines',
                        line: {
                            dash: 'dashdot',
                            width: 4
                        }
                    },
                    {
                        x: [filters[test].avg_accepted, filters[test].avg_accepted],
                        y: [filters.GPA.avg_accepted - 2, filters.GPA.avg_accepted + 2],
                        mode: 'lines',
                        marker: { color: "00FFFB" },
                        name: 'Lines',
                        line: {
                            dash: 'dashdot',
                            width: 4
                        }
                    },
                    ///////////////////////////////////////////////////////////////////////////////////////
                    {
                        x: students
                            .filter(s => s.status === "denied")
                            .map(s => s[ test ]),
                        y: students.filter(s => s.status === "denied").map(s => s.GPA),
                        // type: "scatter",
                        mode: "markers",
                        marker: { 
                            color: "red",
                            size: 10,
                        },
                        name: "Denied"
                    },

                    {
                        x: students
                            .filter(s => s.status === "accepted")
                            .map(s => s[ test ]),
                        y: students.filter(s => s.status === "accepted").map(s => s.GPA),
                        type: "scatter",
                        mode: "markers",
                        marker: { color: "green", size: 10,},
                        name: "Accepted"
                    },
                    {
                        x: students
                            .filter(s => s.status !== "accepted" && s.status !== "denied")
                            .map(s => s[ test ]),
                        y: students
                            .filter(s => s.status !== "accepted" && s.status !== "denied")
                            .map(s => s.GPA),
                        type: "scatter",
                        mode: "markers",
                        marker: { color: "orange", size: 10,},
                        name: "Other"
                    }

                ] }
                layout={ { width: 1000, height: 800, title: "Scatterplot of Application Status of Matching Student Profiles"} }
            />
            <Select onChange={(e) => { setTest(e.target.value) }} defaultValue={"ACT_composite"} >
                <MenuItem value="ACT_composite">ACT_Composite </MenuItem>
                <MenuItem value="SAT_math">SAT_Math </MenuItem>
                <MenuItem value="SAT_ebrw">SAT_EBRW </MenuItem>
                {/* <MenuItem value="SAT">SAT</MenuItem>
                <MenuItem value="ACT_English">ACT English</MenuItem>
                <MenuItem value="ACT_math">ACT math</MenuItem>
                <MenuItem value="ACT_reading">ACT reading</MenuItem>
                <MenuItem value="ACT_science">ACT science</MenuItem> */}
                <MenuItem value="WA_SAT">Weighted Average of Percentile Scores for Standardized Tests</MenuItem>
            </Select>
            vs. GPA
        </>
    )
}

export default ScatterPlot
