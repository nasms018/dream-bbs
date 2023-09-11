import { Link } from "react-router-dom";
//import {useState} from 'react-router'
import Login from "components/Login";
import APPContext from "context/AppContextProvider";
import { useContext } from "react";
import Fetch from "toolbox/Fetch";
import Dropdown from "react-bootstrap/Dropdown";

export default function BBSNav() {
  const boardListUri = `/bb/anonymous/listAll`;
  const { auth } = useContext(APPContext);
  const isManager = auth.roles?.includes("manager");

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
            to={`/board/${board.id}`}
          >
            {board.name}
          </Link>
        </>
      ))}
      <Dropdown style={{ float: 'right', marginRight: '50px' }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          게시판
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {boardList.map((board) => (
            <>
              &nbsp;&nbsp;
              <Dropdown.Item href={`/board/${board.id}`}>
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
