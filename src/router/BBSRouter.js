import PostList from 'components/post/PostList';
import Home from 'components/Home';
import PostDetail from 'components/post/PostDetail';
import { Route, Routes } from 'react-router';
import Register from 'components/Register';
import MemberList from 'components/MemberList';
import PostMng from 'components/post/PostMng';

export default function BBSRouter() {
    return (
        <Routes> 
          <Route path="/" element={ <Home /> } />
          <Route path="/board/:id/:pageNo" element={ <PostList /> } />
          <Route path="/post/:id" element={ <PostDetail /> } />
          <Route path="/post/managePost" element={ <PostMng /> } />

          <Route path="/sign-up" element={ <Register /> } />
          <Route path="/member_list/:ownerId" element={ <MemberList /> } />
        </Routes>
       
      )
}
