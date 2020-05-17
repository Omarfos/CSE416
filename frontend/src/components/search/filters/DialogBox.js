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

import queryString from "query-string";

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [savedsearch, setSavedSearch] = useState([]);
    // const [ searchName, setSearchName ] = useState("");
    // const [student, setStudent] = useState(props.student);

    const handleClickOpen = () => {
        console.log(props.student)
        console.log(props.location)
        setOpen(true);
        // handleAddSearch()
    };

    const handleClose = () => {
        console.log("nothing is saved")
        console.log(savedsearch)
        setOpen(false);
    };

    // const handleSave = () => {
    //     console.log("searchname is", searchName)
    //     console.log(props.location.search)
    //     setSavedSearch( {'name': searchName})
    //     setSavedSearch([
    //         ...savedsearch,
    //         {
    //         name: searchName,
    //         url: props.location.search,
    //         }
    //     ]);
    //     console.log("saved search is ")
    //     console.log(savedsearch)
    //     handleUpdateProfile()
    //     setOpen(false);
    // }

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
            // setErrorStatus("error");
            // setErrorMessage("No High School Information Found. ");
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
        console.log("the keyid is ", id)
        console.log("saved search is ", savedsearch)
        const newlist = [].concat(savedsearch);
        console.log("newlist is ", newlist)
        newlist.splice(id, 1);
        console.log("after splicing newlist is ", newlist)
        setSavedSearch(newlist);
    }

    return (
        <div>
            <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleClickOpen}>
                Save Search
            </Button>
            <Button variant="contained" color="secondary">
                View/Delete/Run
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Saving Search Result</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the name you would like the search criteria to be saved (ex: safety schools, stretch schools).
                    </DialogContentText>
                    {/* <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        id="searchName"
                        label="Search Name"
                        type="name"
                        // defaultValue={"Name"}
                        fullWidth
                        onChange={(e) => setSearchName(e.target.value)}
                        // onChange={updateField}
                    /> */}

                    <div name="savedsearches">
                        <Typography variant="h6">
                            Saved Searches:
                        </Typography>
                        {savedsearch.length > 0 &&
                            <div name="yooo">
                                {savedsearch.map((saved, key) => (
                                    <Searchlist saved={saved} navigateSaved={props.navigateSaved} key={key} keyID={key} handleRemoveSavedSearch={handleRemoveSavedSearch} handleEditSearchName={handleEditSearchName} />
                                ))}
                            </div>
                        }
                        {savedsearch.length == 0 &&
                            <Typography variant="h6">
                                NO saved searches
                            </Typography>
                        }
                        <div>
                            <Tooltip title="Add more college application">
                                {/* <IconButton onClick={handleAddSearch}>
                                    <Icon className={classes.addButton}>add_circle</Icon>
                                </IconButton> */}
                                <Fab color="secondary" onClick={handleAddSearch}>
                                    <AddIcon />
                                </Fab>
                            </Tooltip>
                        </div>
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
    // const classes = useStyles();

    return (
        <div name="yerrr" onClick={event => props.navigateSaved( props.saved.url )}>
            {/* hover */}
            <Typography>
                {props.keyID + 1}:
            </Typography>

            <TextField
                id="standard-full-width"
                // label={props.placeholder}
                style={{ margin: 8 }}
                // placeholder="Placeholder"
                helperText="Full width!"
                margin="normal"
                defaultValue={props.saved.name}
                onChange={(e) => { props.handleEditSearchName(e, props.keyID)}}
            />
            <div>
                <Tooltip title="Delete this college application. Nothing will be saved until clicking 'update profile'">
                    <IconButton id={props.keyID} onClick={() => props.handleRemoveSavedSearch(props.keyID)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
}

// onClick={handleSave}
// type="submit"