import { Link } from 'react-router-dom';
//import {useState} from 'react-router'
import Fetch from 'toolbox/Fetch';
import Login from 'components/Login';
import MemberList from 'components/MemberList';
import APPContext from "context/AppContextProvider";
import {  useState, useContext } from "react";

export default function BBSNav() {
    const boardListUri = `/bb/anonymous/listAll`;
    const { auth } = useContext(APPContext);
    const isManager = auth.roles?.includes("manager");

    return (
        <header>
            &nbsp;&nbsp;
            <Link className='badge bg-danger text-wrap' to="/">홈</Link>
            <Fetch uri={boardListUri} renderSuccess={RenderSuccess} />
            &nbsp;&nbsp;

            {isManager?<Link className='badge bg-warning text-wrap' key="000" to={`/member_list/0000`} > {/* disabled={handleSubmit}*/}
            회원목록
            </Link>  :""}
           <Login />
        </header>

    )
}

function RenderSuccess(boardList) {
    return boardList.map(board=>(
        <>&nbsp;&nbsp;
        <Link className='badge bg-warning text-wrap' key={board.id} to={`/board/${board.id}`}>
            {board.name}
            </Link></>
        ))

}
