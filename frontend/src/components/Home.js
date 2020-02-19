import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Home() {

    async function handleSearch(event){
        event.preventDefault();
        useHistory.push('/search_page/' + event.target.q.value);
    }

    return (
        <div>HOME PAGE</div>
    );
}
