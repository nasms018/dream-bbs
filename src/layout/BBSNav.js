import { Link, useNavigate } from "react-router-dom";
//import {useState} from 'react-router'
import Login from "components/Login";
import APPContext from "context/AppContextProvider";
import { useContext } from "react";
import Fetch from "toolbox/Fetch";
import Dropdown from "react-bootstrap/Dropdown";
import PostUpdate from "components/post/PostUpdate";


export default function BBSNav() {
  const boardListUri = `/bb/anonymous/listAll`;
  const { auth } = useContext(APPContext);
  const isManager = auth.roles?.includes("manager");
  const navigate = useNavigate();

  return (
    <header>
      &nbsp;&nbsp;
      <Link className="badge bg-danger text-wrap" to="/">
        홈
      </Link>
      <Fetch uri={boardListUri} renderSuccess={RenderSuccess} />
      &nbsp;&nbsp;
      {isManager ? (
        <Link
          className="badge bg-warning text-wrap"
          key="000"
          to={`/member_list/0000`}
        >
          {" "}
          {/* disabled={handleSubmit}*/}
          회원목록
        </Link>
      ) : (
        ""
      )}
      <Login />
      <PostUpdate onClick={handleShow}></PostUpdate>
    </header>
  );
  
}

function RenderSuccess(boardList) {
  return (
    <>
      {boardList.map((board) => (
        <>
          &nbsp;&nbsp;
          <Link
            className="badge bg-warning text-wrap"
            key={board.id}
             onClick={(e)=>{window.location.replace(`/board/${board.id}/1`)}}//to={`/board/${board.id}/1`}
          >{board.name}
          </Link>
          
        </>
      ))}
      <Dropdown style={{ float: 'right', marginRight: '10px' }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          게시판
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {boardList.map((board) => (
            <>
              <Dropdown.Item href={`/board/${board.id}/1`}>
                {board.name}
              </Dropdown.Item>
            </>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

/*
 boardList.map(board=>(
        <>&nbsp;&nbsp;
        <Link className='badge bg-warning text-wrap' key={board.id} to={`/board/${board.id}`}>
            {board.name}
            </Link></>
        ))
*/
