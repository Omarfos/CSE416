import React, { useState} from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EnhancedTable from "./ViewProfilesTable";

const useStyles = makeStyles((theme) => ({
  
    viewprofilesbutton: {
      position: 'absolute',
      top: "70%",
      right: "3%",
      zIndex: "99",
    },
  
  }));
  


export default function ViewProfilesButton(props) {
    const classes = useStyles();

    const [ students, setStudents ] = useState([]);
    const [ open, setOpen ] = React.useState(false);
    const [ scroll, setScroll ] = React.useState("paper");
    const [ user, setUser] = useState(props.user);

    const handleClickOpen = scrollType => {
        setOpen(true);
        handleViewSimilarProfiles(props.college.name, user)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);

    React.useEffect(() => {
        if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
            descriptionElement.focus();
        }
        }
    }, [ open ]);

    const handleViewSimilarProfiles = (college, userid) => {

        axios.get("http://localhost:8000/similar/student", {
          responseType: "json",
          params: {
            userid: userid,
            college: college
          }
        }).then((response) => {
          console.log('data', response)
          let r = response.data.map((s) => {
            return s.fields;
          })
          setStudents(r)
        });
      };

    return (<div>
    <Button
      size="small"
      color="primary"
      variant="outlined"
      aria-label="add"
      className={ classes.viewprofilesbutton }
      onClick={ (e) => { e.stopPropagation(); handleClickOpen() } }
    >
      View Similar Profiles
    </Button>

    <Dialog
      maxWidth="lg"
      open={ open }
      scroll={ scroll }
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      onClick={ e => e.stopPropagation() }
    >
      <DialogTitle id="scroll-dialog-title">Similar Profiles in { props.college.name }</DialogTitle>
      <DialogContent dividers={ scroll === "paper" }>

        <EnhancedTable students={ students } />
      </DialogContent>
      <DialogActions>
        <Button onClick={ (e) => { e.stopPropagation(); handleClose() } } color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </div>);
}