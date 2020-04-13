import React, { useState } from 'react'
import Plot from "react-plotly.js";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { SettingsEthernet } from '@material-ui/icons';

function ScatterPlot(props) {
    const { students } = props
    const [ test, setTest ] = useState("ACT_composite")
    return (
        <>
            <Plot
                data={ [
                    {
                        x: students
                            .filter(s => s.status === "denied")
                            .map(s => s[ test ]),
                        y: students.filter(s => s.status === "denied").map(s => s.GPA),
                        type: "scatter",
                        mode: "markers",
                        marker: { color: "red" },
                        name: "Denied"
                    },

                    {
                        x: students
                            .filter(s => s.status === "accepted")
                            .map(s => s[ test ]),
                        y: students.filter(s => s.status === "accepted").map(s => s.GPA),
                        type: "scatter",
                        mode: "markers",
                        marker: { color: "green" },
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
                        marker: { color: "orange" },
                        name: "Other"
                    }

                    // {
                    //   x: [1, 2, 3, 4],
                    //   y: [2, 6, 3],
                    //   type: "scatter",
                    //   mode: "markers",
                    //   marker: { color: "red" }
                    // }
                ] }
                layout={ { width: 1000, height: 800, title: "A Fancy Plot" } }
            />
            <Select onChange={ (e) => { setTest(e.target.value) } }>
                <MenuItem value="ACT_composite">ACT </MenuItem>
                <MenuItem value="SAT">SAT</MenuItem>
                <MenuItem value="ACT_english">ACT English</MenuItem>
                <MenuItem value="ACT_math">ACT math</MenuItem>
                <MenuItem value="ACT_reading">ACT reading</MenuItem>
                <MenuItem value="ACT_science">ACT science</MenuItem>

            </Select>
        </>
    )
}

export default ScatterPlot
