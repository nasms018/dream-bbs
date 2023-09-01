import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useFatch } from 'hooks/useFatch';
import Fetch from 'toolbox/Fetch';
//Home, 
export default function Header() {
    const boardListUri = "/bb/anonymous/listAll";
  
    return (
        <>
            <Link to="/">Home</Link>
            <Fetch uri={boardListUri} renderSuccess={RenderSuccess} />
        </>
    )
}


function RenderSuccess(boardList) {
    return <>{boardList.map(board=>{
        return <Link key={board.id} to={`/post/anonymous/listAll/${board.id}`}>{board.name}</Link>})}
    </>

}
 
