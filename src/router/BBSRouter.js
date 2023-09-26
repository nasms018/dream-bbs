import Home from 'components/Home';
import MemberList from 'components/MemberList';
import Register from 'components/Register';
import PostDetail from 'components/post/PostDetail';
import PostList from 'components/post/PostList';
import PostMng from 'components/post/PostMng';
import { Route, Routes } from 'react-router-dom';

export default function BBSRouter() {
    return (
      
        <Routes> 
          <Route path="/" element={ <Home /> } />
          <Route path="/board" element={ <PostList /> } />
          <Route path="/board/:boardId/:page" element={ <PostList /> } />
          <Route path="/post" element={ <PostDetail /> } />
          <Route path="/post/managePost" element={ <PostMng /> } />

          <Route path="/sign-api/sign-in" element={ <Register /> } />
          <Route path="/member_list/:ownerId" element={ <MemberList /> } />
        </Routes>
      
      )
}
