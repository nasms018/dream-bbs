import React from "react";
import Fetch from 'toolbox/Fetch';
import { useParams } from 'react-router-dom'
import { displayDate } from "toolbox/displayDate";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from 'react-bootstrap/ListGroup';

export default function PostDetail() {
    const { id } = useParams();
    const postUri = `/post/anonymous/getPost/${id}`
    return (
        <Fetch uri={postUri} renderSuccess={RenderSuccess} />
    )
}

function RenderSuccess(post) {
    console.log(post)
    return <>
<ListGroup as="ul">
      <ListGroup.Item variant="warning" as="li" active>
       
      title : {post.title}
      </ListGroup.Item>
      <ListGroup.Item as="li" disabled>
        writer : {post.writer ? post.writer.username : ""}&nbsp;&nbsp;
        readCnt : <span>{post.readCnt}&nbsp;&nbsp;</span>
        likeCnt : <span>{post.likeCnt}&nbsp;&nbsp;</span>
        disCnt : <span>{post.disCnt}&nbsp;&nbsp;</span>
        최종작성일 : <span>{displayDate(post.regDt, post.uptDt)}</span>
      </ListGroup.Item>
      <ListGroup.Item as="li">{post.content}</ListGroup.Item>


        <Replies listReply={post.listReply} />
    </ListGroup>
    </>
}

function Replies({ listReply = [] }) {
    if (!listReply || listReply.length === 0)
        return "";

    return <ul>
        {listReply.map((reply) => {
                
            return <ListGroup.Item as="li">
                ㄴ댓글 : <span>{reply.content}</span>
                &nbsp;&nbsp; 최종작성일 : <span>{displayDate(reply.regDt, reply.uptDt)}</span>
                &nbsp;&nbsp; 작성자 : <span>{reply.writer ? reply.writer.nick : ""}</span>
                <Replies listReply={reply.listReply} />
                </ListGroup.Item>
        })}
    </ul>
}