import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import logoImage from "../images/logo.png";
import Divider from "@material-ui/core/Divider";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import { logoutUrl } from "./Url";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "65px",
  },
  navBar: {
    backgroundColor: "#eef5ff",
    minHeight: 65,
    height: 65,
  },
  title: {
    flexGrow: 1,
  },
  button: {
    textDecoration: "none",
    color: "#8493d3",
    fontSize: 25,
    paddingLeft: "15px",
    paddingRight: "15px",
    paddingTop: "18px",
    paddingBottom: "18px",
    "&:hover": {
      background: "hsla(240, 48%, 41%, 0.1)",
      color: "#5d6896",
      paddingTop: "18px",
      paddingBottom: "18px",
    },
  },
  search: {
    minWidth: "300px",
    width: "30vw",
    height: "45px",
    marginBottom: "5px",
    marginTop: "5px",
    marginRight: "300px",
  },
  input: {
    width: "85%",
  },
  logo: {
    height: "40px",
    minHeight: "40px",
    paddingLeft: "10px",
    paddingRight: "10px",
    "&:hover": {
      background: "hsla(240, 48%, 41%, 0.1)",
      color: "#5d6896",
      paddingTop: "16px",
      paddingBottom: "16px",
    },
  },
  divider: {
    height: "60%",
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  let history = useHistory();

  async function handleLogout() {
    axios.post(logoutUrl,{
      method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    userid: props.user
  }).then((data) => {
      if (data.status == 200) {
        props.setUser(null);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  const handleSearch= (event)=> {
    event.preventDefault();
    history.push("/search/college?name=" + event.target.searchQuery.value);
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.navBar}>
        <Toolbar>
          <Typography align="left" className={classes.title}>
            <Link href="/">
              <img src={logoImage} className={classes.logo} />
            </Link>
          </Typography>

          {/* search on navigation bar for some pages */}
          <Route exact path={["/search/:q", "/college/:id"]}>
            <SearchBar classes={classes} handleSearch={handleSearch} placeholder="Search for College"/>
          </Route>
          {props.user &&(
            <React.Fragment>
              <Link className={classes.button} href={"/student/" + props.user}>
                Profile
              </Link>
              <Divider orientation="vertical" className={classes.divider} />
              <Link className={classes.button} href="/" onClick={handleLogout}>
                Log out
              </Link>
            </React.Fragment>
          )}
          {!props.user &&(
            <React.Fragment>
              <Link className={classes.button} href="/login">
                Login
              </Link>
              <Divider orientation="vertical" className={classes.divider} />
              <Link className={classes.button} href="/register">
                Register
              </Link>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
