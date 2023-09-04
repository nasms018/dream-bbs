import { Link } from 'react-router-dom';
import Fetch from 'toolbox/Fetch';

export default function Header() {
    const boardListUri = "http://localhost:8080/bb/anonymous/listAll";
  
    return (
        <header>
            <Link to="/">Header</Link>
            &nbsp;&nbsp;
            <Fetch uri={boardListUri} renderSuccess={RenderSuccess} />
        </header>
    )
}

function RenderSuccess(boardList) {
    return <>{boardList.map(board=>(
        <Link key={board.id} to={`/board/${board.id}`}>
            &nbsp;{board.name}
            </Link>
        ))}
    </>

}
 
