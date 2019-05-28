import React, { useState, useEffect } from 'react';
import Tournament from './Tournament';

function AllTourn(props) {
    const [tourn, setTourn] = useState([]);
    const [query, setQuery] = useState('');
    const [showSyncOnly, setShowSyncOnly] = useState(true);

    async function getData() {
        let response = await fetch('https://cors-anywhere.herokuapp.com/rating.chgk.info/api/tournaments.json?page=5', 
        {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).catch(err => console.error(err));
        let data = await response.json();
        let items = data.items;
        setTourn(items);
    }

    useEffect(() => {
        getData();
    }, []);

    function changeHandle(event) {
        setQuery(event.target.value);
    }

    function handleSync() {
        setShowSyncOnly (currState => !currState);
    }

    return (
        <>
            <form>
                <label htmlFor="search">Название: </label>
                <input type="text" name="search" value={query} onChange={changeHandle} />
                    <div className="checkboxes">
                        <input type='checkbox' name='showType' id='sync' value="sync" onChange={handleSync} checked={showSyncOnly} />
                        <label htmlFor="sync">Только синхроны</label>
                    </div>
            </form>
            <ul>
                {tourn
                    .filter((t) => {
                        const now = new Date();
                        const tourDate = new Date(t.date_end);
                        const queryStr = query.toLowerCase();

                        if (showSyncOnly) { 
                            return t.name.toLowerCase().includes(queryStr) && now < tourDate && (t.type_name === 'Синхрон' || t.type_name === 'Асинхрон');
                        } else {
                            return t.name.toLowerCase().includes(queryStr) && now < tourDate; 
                        }
                    })
                    .map(t => {
                    return (
                        <li key={t.idtournament} >
                            <Tournament tour={t} />
                        </li>
                    );
                })}
            </ul>
        </>
    )
}

export default AllTourn;
