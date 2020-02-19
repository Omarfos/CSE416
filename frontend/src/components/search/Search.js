import React, { useState, useEffect } from 'react';


export default function Search(props) {
    const [SearchResult, setSearchResult] = useState(null);
    useEffect(() => {
        async function fetchData() {
            console.log("fetching");
        };
        fetchData();
    });
    return (
        <div>Search Result PAGE</div>
    );
}
