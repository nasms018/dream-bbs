import axios from 'api/axios';
import NewReply from 'atom/NewReply';
import AppContext from "context/AppContextProvider";
import { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useLocation } from 'react-router-dom';
import Fetch from 'toolbox/Fetch';
import { displayDate } from "toolbox/displayDate";
import { useFatch } from 'hooks/useFatch';
import ReplyList from './ReplyList';

export default function PostDetail() {
    const { auth } = useContext(AppContext);
    const location = useLocation();
    
    const state = location.state;
    const postUri = `/post/anonymous/getPost/${state.id}`

    return <>
        <Link key={state.boardId} to={`/board`} state={state}>
            목록으로
        </Link>
        <Fetch uri={postUri} renderSuccess={RenderSuccess} />
        </>
    


function RenderSuccess(post){
        //console.log(post.listReply);
        return <>
            <ListGroup responsive variant="white">

                <ListGroup.Item variant="white" as="li" active>
                    title : {post.title}
                </ListGroup.Item>
                <ListGroup.Item as="li" disabled>
                    writer : {post.writer ? post.writer.username : ""}&nbsp;&nbsp;
                    readCnt : <span>{post.readCnt}&nbsp;&nbsp;</span>
                    likeCnt : <span>{post.likeCnt}&nbsp;&nbsp;</span>
                    disCnt : <span>{post.disCnt}&nbsp;&nbsp;</span>
                    최종작성일 : <span>{displayDate(post.regDt, post.uptDt)}</span>
                </ListGroup.Item>
                <ListGroup.Item as="li" style={{ height: 100 }}>{post.content}</ListGroup.Item>

                {(post.writer ? post.writer.nick === auth.userNick : false) ?
                    <ListGroup.Item as="li">
                        <Link
                            className="badge bg-info text-wrap"
                            to="/post/managePost" state={{ post: post }}>
                            수정
                        </Link>
                        <Link
                            className="badge bg-danger text-wrap"
                            to={`/delete/{id}`}>
                            삭제
                        </Link>
                    </ListGroup.Item>
                    : ""}
                
                <ReplyList parent={post} />
            </ListGroup>
        </>
    }
}