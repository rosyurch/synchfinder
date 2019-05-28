import React from 'react';

function Tournament(props) {
    const { name, type_name, date_end, date_start, idtournament } = props.tour;
    return (
        <>
            <h3>{name}</h3>
            <span>{type_name}</span>
            <p>Start: {date_start.substring(0,10)} to: {date_end.substring(0,10)}</p>
            <a href={`https://rating.chgk.info/tournament/${idtournament}/`} target="_blank" rel="noopener noreferrer" >Link</a>
        </>
    )
}

export default Tournament;
