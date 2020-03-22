import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link, useHistory } from "react-router-dom";


export default function Search(props) {
    //DO we actually need this variable?
    const [SearchResult, setSearchResult] = useState(null);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            // const res = await axios.get(location.pathname);
            // if(!res.data.error){
            //     console.log(res.data.q);
            // }
        };
        fetchData();
    });

    async function handleSearch(event){
        event.preventDefault();
        history.push('/search/' + event.target.searchQuery.value);
        //refresh. or whatever
    }

    return (
        <div>Search Result PAGE searching 
            <div>
                <form onSubmit={handleSearch}>
                Top Search Bar<input name="searchQuery"></input>
                <button type="submit">Search</button>
                </form>
                
            </div>
            <div>
                Left Filter
            </div>
            <div>
                Right Search Result
            </div>


        </div>
    );
}
