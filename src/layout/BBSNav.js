import { Link } from 'react-router-dom';
import Fetch from 'toolbox/Fetch';
import Login from 'components/Login';


export default function BBSNav() {
    const boardListUri = `/bb/anonymous/listAll`;
  
    return (
        <header>
            <Link className='badge bg-warning text-wrap' to="/">BBSNav</Link>
            <Fetch uri={boardListUri} renderSuccess={RenderSuccess} />
            <Login />
        </header>

    )
}

function RenderSuccess(boardList) {

    return boardList.map(board=>(
        
        <Link className='badge bg-warning text-wrap' key={board.id} to={`/board/${board.id}`}>
            {board.name}
            </Link>
        ))

}
