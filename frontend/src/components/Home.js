import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles} from '@material-ui/core/styles';
import SearchBar from 'material-ui-search-bar';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    bar: {
      backgroundColor: '#eef5ff',
    },
    button:{
      color:'#8493d3',
      fontSize: 20
    },
    
  }));

  
export default function Home() {
    let history = useHistory();
    const classes = useStyles();

    async function handleSearch(event){
        event.preventDefault();
        history.push('/search/' + event.target.searchQuery.value);
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSearch}>
                <SearchBar
                onChange={() => console.log('onChange')}
                onRequestSearch={() => console.log('onRequestSearch')}
                style={{
                    margin: '0 auto',
                    maxWidth: 800
                }}
                />
                Search Bar<input name="searchQuery"></input>
                <button type="submit">Search</button>
                </form>
            </div>
        </div>
    );
}
