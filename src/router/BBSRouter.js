import PostList from 'components/post/PostList';
import Home from 'components/Home';
import PostDetail from 'components/post/PostDetail';
import { Route, Routes } from 'react-router';
import Register from 'components/Register';
import MemberList from 'components/MemberList';
import PostNew from 'components/post/PostNew';


export default function BBSRouter() {
    return (
        <Routes> 
          <Route path="/" element={ <Home /> } />
          <Route path="/board/:id/:pageNo" element={ <PostList /> } />
          <Route path="/post/:id" element={ <PostDetail /> } />
          <Route path="/post/new/:boardId" element={ <PostNew /> } />

          <Route path="/sign-up" element={ <Register /> } />
          <Route path="/member_list/:ownerId" element={ <MemberList /> } />
        </Routes>
       
      )
}
