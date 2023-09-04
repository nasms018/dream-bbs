import { Link } from 'react-router-dom';
import Fetch from 'toolbox/Fetch';
import Button from 'react-bootstrap/Button';
import Example from 'components/Example';

const showLoginModal = () => {
    return<Example />
}

export default function BBSNav() {
    const boardListUri = "http://localhost:8080/bb/anonymous/listAll";
  
    return (
        <header>
            <Link to="/">BBSNav</Link>
            &nbsp;&nbsp;
            <Fetch uri={boardListUri} renderSuccess={RenderSuccess} />
            <Example />
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
 
