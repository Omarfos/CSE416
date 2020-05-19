import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import { studentUrl, hostUrl } from "../../Url";
import React, { useState, useEffect } from "react";
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FindInPageIcon from '@material-ui/icons/FindInPage';

import queryString from "query-string";

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [savedsearch, setSavedSearch] = useState([]);

    const handleClickOpen = () => {
        console.log(props.student)
        console.log(props.location)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // posting the information to the database
    async function handleUpdateProfile(event) {
        event.preventDefault();
        let url1 = studentUrl + props.student + "/edit/savedsearch";
        axios.post(url1, {
            method: "POST",
            headers: {
                "Content-Type": "savedsearch/json",
            },
            savedsearch: JSON.stringify(savedsearch),
        })
        .then((res) => {
            console.log("POST savedsearch ")
            // console.log(res)
            console.log(res.data)
            setSavedSearch(res.data);
        });
        setOpen(false);
    }

    //getting the information from the database
    useEffect(() => {
        let url2 = studentUrl + props.student + "/savedsearch" 
        axios.get(url2)
        .then((data) => {
            console.log("GET savedsearch")
            console.log(data)
            if (data.status === 200) {
                setSavedSearch(data.data.savedsearch)
            }
        }).catch((error) => {
            console.log("error")
            console.log(props.student)
        });
    }, [ open ] );      // do useeffect only if saved search changes. 

    async function handleAddSearch() {
        let newSavedSearch = savedsearch.concat([{ name: "", url: props.location.search }]);
        setSavedSearch(newSavedSearch);
    }
    
    async function handleEditSearchName(event, index) {
        const newSavedSearch = [].concat(savedsearch);
        newSavedSearch[index].name = event.target.value;
        setSavedSearch(newSavedSearch);
    }

    async function handleRemoveSavedSearch(id) {
        const newlist = [].concat(savedsearch);
        newlist.splice(id, 1);
        setSavedSearch(newlist);
    }

    return (
        <div>
            <Button variant="contained" color="primary" startIcon={<FindInPageIcon/>} onClick={handleClickOpen}>
                Save/Edit/View Search
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Saving Search Result</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the name you would like the search criteria to be saved after clicking the ADD Button(ex: safety schools, stretch schools).
                        <br></br>
                        You have to click the SAVE button to save it.
                    </DialogContentText>

                    <div name="savedsearches">
                        <div align="right">
                            <Tooltip title="Save a new search">
                                <Fab color="secondary" size="medium" onClick={handleAddSearch}>
                                    <AddIcon />
                                </Fab>
                            </Tooltip>
                        </div>
                        <Typography variant="h6">
                            Saved Searches:
                        </Typography>
                        {savedsearch.length > 0 &&
                            <div name="yooo">
                                {savedsearch.map((saved, key) => (
                                    <Searchlist saved={saved} navigateSaved={props.navigateSaved} handleClose={handleClose} key={key} keyID={key} handleRemoveSavedSearch={handleRemoveSavedSearch} handleEditSearchName={handleEditSearchName} />
                                ))}
                            </div>
                        }
                        {savedsearch.length == 0 &&
                            <Typography variant="h6">
                                NO saved searches
                            </Typography>
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateProfile} color="primary">
                        Save
                    </Button>
                </DialogActions>
                
            </Dialog>
        </div>
    );
}

function Searchlist(props) {
    return (
        <div name="yerrr">
            <Typography>
                {props.keyID + 1}:
            </Typography>

            <div align="left">
                <TextField
                    id="standard-full-width"
                    // label={props.placeholder}
                    style={{ margin: 8 }}
                    // placeholder="Placeholder"
                    helperText="Name of Saved Search"
                    margin="normal"
                    value={props.saved.name}
                    onChange={(e) => { props.handleEditSearchName(e, props.keyID) }}
                />
                <Tooltip title="View this saved search. Click the 'SAVE' button to save any previous ADD/DELETE">
                    <IconButton align="right" id={props.keyID} onClick={(e) => { props.navigateSaved(props.saved.url); props.handleClose() }}>
                        <MenuBookIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip align="right" title="Delete this SEARCH. Nothing will be saved until clicking 'SAVE'">
                    <IconButton id={props.keyID} onClick={(e) => props.handleRemoveSavedSearch(props.keyID)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
}