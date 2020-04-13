import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import TextField from '@material-ui/core/TextField';

export default function SearchBar(props) {

    return(
      <form onSubmit={(e) => {props.handleSearch(e)}}>
        <Paper className={props.classes.search } >
        <InputBase
          name="searchQuery"
          className={props.classes.input }
          placeholder={props.placeholder}
        />
        <IconButton
          type="submit"
          className={props.classes.iconButton }
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      {props.detail &&
          <div>
            <TextField id="city" label="City" required className={props.classes.detail_textfield}/>
            <TextField id="state" label="State" required className={props.classes.detail_textfield}/>
          </div>
        } 
      </form>
    )
}