import LoginModal from "components/LoginModal";
import AppContext from "context/AppContextProvider";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate,useParams } from "react-router-dom";
import { Fetch } from "toolbox/Fetch";


export default function BBSNav() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const boardListUri = `/bb/anonymous/listAll`;
  const { auth } = useContext(AppContext);
  const isManager = auth?.roles?.includes("manager");

  const handleNavigate = (board_id, e) =>{
    e.preventDefault();

    console.log(board_id);
  navigate(`/board/${board_id}/1`, {state:{boardId:board_id, page:1}});

  }

  return (
    <Container>
      <Row>
        <Col md="auto">
      &nbsp;&nbsp;
      <Link className="badge bg-danger text-wrap" to="/">
        홈
      </Link>
      </Col>
      <Col md="auto">
      <Fetch uri={boardListUri} renderSuccess={RenderSuccess} />
      &nbsp;&nbsp;
      </Col>
      <Col md="auto">
      {isManager ? (
        <Link
          className="badge bg-warning text-wrap"
          key="0001"
          to={`/member_list/0000`}
        >
          {" "}
          {/* disabled={handleSubmit}*/}
          회원목록
        </Link>
      ) : (
        ""
      )}
    </Col>
      <Col>
      <LoginModal />
      </Col>
    
    </Row>
    </Container>
  );



function RenderSuccess(boardList) {
  
  return (
    <>
      {boardList.map((board) => (
        <>
          &nbsp;&nbsp;
          <button
            className="badge bg-warning text-wrap"
            key={board.id}
            onClick={(e)=>handleNavigate(board.id, e)}
            state={{ boardId: board.id, page: 1 }}
          //onClick={(e)=>{window.location.replace(`/board/${board.id}/1`)}}
          >{board.name}
          </button>
        </>
      ))}
    </>
  );
}
}
/*
 boardList.map(board=>(
        <>&nbsp;&nbsp;
        <Link className='badge bg-warning text-wrap' key={board.id} to={`/board/${board.id}`}>
            {board.name}
            </Link></>
        ))

<Dropdown style={{ float: 'right', marginRight: '10px' }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          게시판
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {boardList.map((board) => (
            <>
              <Dropdown.Item key={board.id} href={`/board`}
                state={{ boardId: board.id, page: 1 }}>
                {board.name}
              </Dropdown.Item>
            </>
          ))}
        </Dropdown.Menu>
      </Dropdown>


*/
