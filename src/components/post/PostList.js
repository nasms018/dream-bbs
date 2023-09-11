import APPContext from "context/AppContextProvider";
import { useContext } from "react";
import { Link, useParams } from 'react-router-dom';
import Fetch from 'toolbox/Fetch';
import { displayDate } from 'toolbox/displayDate';


export default function PostList() {
    const { id:boardId } = useParams();  // APP에 있는 :id 와 이름 통일  //http://localhost:8080/post/anonymous/listAll/000n
    const postListUri = `/post/anonymous/listAll/${boardId}`
    const { auth } = useContext(APPContext);
    const isMember = auth.roles?.includes("member");


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>좋아요</th>
                        <th>최종수정일</th>
                    </tr>
                </thead>
                <tbody>
                    <Fetch uri={postListUri} renderSuccess={RenderSuccess} />
                </tbody>
            </table>
            {/*  */}
            {isMember?<Link className='badge bg-warning text-wrap' key="000" to={`/post/new/${boardId}`} >글쓰기</Link>:""}
        </div>
    )
}

function RenderSuccess(postList) {
    return postList.map(post => (
        <tr key={post.id}>
            <td>
                <Link key={post.id} to={`/post/${post.id}`}>
                    &nbsp;&nbsp;{post.title}
                </Link>
            </td>
            <td>{post.writer ? post.writer.name : ""}</td>
            <td>{post.readCnt}</td>
            <td>{post.likeCnt}</td>
            <td><span>{displayDate(post.regDt, post.uptDt)}</span></td>
        </tr>
    ))

}
