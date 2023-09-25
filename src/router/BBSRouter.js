import PostList from 'components/post/PostList';
import Home from 'components/Home';
import PostDetail from 'components/post/PostDetail';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from 'components/Register';
import MemberList from 'components/MemberList';
import PostMng from 'components/post/PostMng';

export default function BBSRouter() {
    return (
      
        <Routes> 
          <Route path="/" element={ <Home /> } />
          <Route path="/board" element={ <PostList /> } />
          <Route path="/post" element={ <PostDetail /> } />
          <Route path="/post/managePost" element={ <PostMng /> } />

          <Route path="/sign-api/sign-in" element={ <Register /> } />
          <Route path="/member_list/:ownerId" element={ <MemberList /> } />
        </Routes>
      
      )
}
