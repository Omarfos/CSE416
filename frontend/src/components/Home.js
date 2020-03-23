import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Home() {
    let history = useHistory();

    async function handleSearch(event){
        event.preventDefault();
        history.push('/search/' + event.target.searchQuery.value);
    }

    return (
        <div>
            Home page. 
            <div>
                <form onSubmit={handleSearch}>
                Search Bar<input name="searchQuery"></input>
                <button type="submit">Search</button>
                </form>
            </div>
        </div>
    );
}
