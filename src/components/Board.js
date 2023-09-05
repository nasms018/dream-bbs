import React from 'react'
import Fetch from 'toolbox/Fetch';
import { useParams, Link } from 'react-router-dom'
import { displayDate } from 'toolbox/displayDate';

export default function Board() {
    const { id } = useParams();  // APP에 있는 :id 와 이름 통일  //http://localhost:8080/post/anonymous/listAll/000n
    const postListUri = `http://localhost:8080/post/anonymous/listAll/${id}`
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
