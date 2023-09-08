import React from "react";
import Fetch from 'toolbox/Fetch';
import { useParams } from 'react-router-dom'
import { displayDate } from "toolbox/displayDate";


export default function PostDetail() {
    const { id } = useParams();
    const postUri = `/post/anonymous/getPost/${id}`
    return (
        <Fetch uri={postUri} renderSuccess={RenderSuccess} />
    )
}

function RenderSuccess(post) {

    return <>
        title : <h3>{post.title}</h3>
        content : <p>{post.content}</p>
        writer : {post.writer ? post.writer.username : ""}
        readCnt : <span>{post.readCnt}&nbsp;&nbsp;</span>
        likeCnt : <span>{post.likeCnt}&nbsp;&nbsp;</span>
        disCnt : <span>{post.disCnt}&nbsp;&nbsp;</span>
        최종작성일 : <span>{displayDate(post.regDt, post.uptDt)}</span>
        <Replies listReply={post.listReply} />
    </>
}

function Replies({ listReply = [] }) {
    if (!listReply || listReply.length === 0)
        return "";

    return <ul>
        {listReply.map((reply) => {
                
            return <li>
                ㄴ댓글 : <span>{reply.content}</span>
                &nbsp;&nbsp; 최종작성일 : <span>{displayDate(reply.regDt, reply.uptDt)}</span>
                &nbsp;&nbsp; 작성자 : <span>{reply.writer ? reply.writer.nick : ""}</span>
                <Replies listReply={reply.listReply} />
            </li>
        })}
    </ul>
}