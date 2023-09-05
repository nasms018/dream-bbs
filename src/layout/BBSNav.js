import { Link } from 'react-router-dom';
import Fetch from 'toolbox/Fetch';
import Login from 'components/Login';


export default function BBSNav() {
    const boardListUri = `http://localhost:8080/bb/anonymous/listAll`;
  
    return (
        <header>
            <Link to="/">BBSNav</Link>
            &nbsp;&nbsp;
            <Fetch uri={boardListUri} renderSuccess={RenderSuccess} />
            <Login />
        </header>

    )
}

function RenderSuccess(boardList) {

    return boardList.map(board=>(
        
        <Link key={board.id} to={`/board/${board.id}`}>
            &nbsp;{board.name}
            </Link>
        ))

}
 
