import React from 'react'
import { Link } from 'react-router-dom'
import { useFatch } from 'hooks/useFatch';
//Home, 
export default function Header() {
    const boardListUri = "http://localhost:8080/bb/anonymous/listAll";
    const { loading, data, error } = useFatch(boardListUri);


    return (
        <>
            <Link to="/">Home</Link>
            {(data) => {
                data.map(board => {
                    return (<Link to={`http://localhost:8080/post/anonymous/listAll/${board.id}`}>{board.name}</Link>)
                })
            }}
            <Link to={`http://localhost:8080/post/anonymous/listAll/0003`}>자유</Link>
        </>
    )
}
