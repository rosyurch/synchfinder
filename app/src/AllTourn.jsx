import React, { useState, useEffect } from 'react';
import Tournament from './Tournament';

function AllTourn(props) {
    const [tourn, setTourn] = useState([]);
    const [query, setQuery] = useState('');
    const [showSyncOnly, setShowSyncOnly] = useState(true);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    async function getData() {
        let response = await fetch('https://cors-anywhere.herokuapp.com/rating.chgk.info/api/tournaments.json?page=5', 
        {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).catch(err => console.error(err));
        let data = await response.json();
        //console.log(data);
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

    function fromHandler(event) {
        let dateVal = new Date(event.target.value);
        if (dateVal.toString() === 'Invalid Date') {      // if input is cleared restore to initial state, same in toHandler
            setFromDate('');
        } else {
            setFromDate(dateVal);
        }
    }

    function toHandler(event) {
        let dateVal = new Date(event.target.value);
        if (dateVal.toString() === 'Invalid Date') {
            setToDate('');
        } else {
            setToDate(dateVal);
        }
    }

    const now = new Date();

    return (
        <>
            <form>
                <label htmlFor="search">Название: </label>
                <input type="text" name="search" value={query} onChange={changeHandle} className="search-input" />
                <div className="checkboxes">
                    <input type='checkbox' name='showType' id='sync' value="sync" onChange={handleSync} checked={showSyncOnly} />
                    <label htmlFor="sync">Только синхроны</label>
                </div>
                <div className="date-input">
                    <label htmlFor="from_date" >От: </label>
                    <input type="date" name="from_date" onChange={fromHandler} />
                    <label htmlFor="to_date" > До: </label>
                    <input type="date" name="to_date" onChange={toHandler} />
                </div>    
            </form>
            <ul>
                {tourn
                    .filter((t) => {
                        const tourEndDate = new Date(t.date_end);
                        const tourStartDate = new Date(t.date_start);
                        const queryStr = query.toLowerCase();

                        if (showSyncOnly) { 
                            return t.name.toLowerCase().includes(queryStr) // filter tourns from       search input
                                && (t.type_name === 'Синхрон' || t.type_name === 'Асинхрон') //filter (a)syncronous tournaments only
                                && (fromDate ? fromDate < tourStartDate : now < tourEndDate) // filter tournaments from input date
                                && (toDate ? toDate > tourEndDate : true); // filter tournaments until input date
                        } else {
                            return t.name.toLowerCase().includes(queryStr) 
                                && (fromDate ? fromDate < tourStartDate : now < tourEndDate) 
                                && (toDate ? toDate > tourEndDate : true); 
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
