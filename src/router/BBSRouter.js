import Board from 'components/Board';
import Home from 'components/Home';
import PostDetail from 'components/PostDetail';
import { Route, Routes } from 'react-router';
import Register from 'components/Register';


export default function BBSRouter() {
    return (
        <Routes> 
          <Route path="/" element={ <Home /> } />
          <Route path="/Board/:id" element={ <Board /> } />
          <Route path="/Post/:id" element={ <PostDetail /> } />
          <Route path="/sign-up" element={ <Register /> } />
        </Routes>
       
      )
}
