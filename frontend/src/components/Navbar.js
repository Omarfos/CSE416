import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link, useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import { Route, Switch, Redirect } from "react-router-dom";
import logoImage from "../images/logo.png";
import Divider from "@material-ui/core/Divider";

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
    props.setUser(null);
  }

  async function handleSearch(event) {
    event.preventDefault();
    history.push("/search/college?name=" + event.target.searchQuery.value);
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.navBar}>
        <Toolbar>
          <Typography align="left" className={classes.title}>
            <Link to="/">
              <img src={logoImage} className={classes.logo} />
            </Link>
          </Typography>

          {/* search on navigation bar for some pages */}
          <Route exact path={["/search/:q", "/college/:id"]}>
            <Paper
              component="form"
              className={classes.search}
              onSubmit={handleSearch}
            >
              <InputBase
                name="searchQuery"
                className={classes.input}
                placeholder="Search for College"
              />
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Route>

          {props.user && (
            <React.Fragment>
              <Link className={classes.button} to={"/profile/" + props.user}>
                Profile
              </Link>
              <Divider orientation="vertical" className={classes.divider} />
              <Link className={classes.button} to="/" onClick={handleLogout}>
                Log out
              </Link>
            </React.Fragment>
          )}
          {!props.user && (
            <React.Fragment>
              <Link className={classes.button} to="/login">
                Login
              </Link>
              <Divider orientation="vertical" className={classes.divider} />
              <Link className={classes.button} to="/register">
                Register
              </Link>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
