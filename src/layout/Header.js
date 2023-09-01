import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useFatch } from 'hooks/useFatch';
//Home, 
export default function Header() {
    const boardListUri = "/bb/anonymous/listAll";
  

    return (
        <>
          
            <Link to="/">Home</Link>
           
            
        </>
    )
}
