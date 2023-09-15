import axios from 'api/axios';
import AppContext from "context/AppContextProvider";
import { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useLocation } from 'react-router-dom';
import Fetch from 'toolbox/Fetch';
import { displayDate } from "toolbox/displayDate";
import NewReply from 'atom/NewReply';
import LoadPost from './PostDetail';



export default function PostDetailOld() {
    const { auth } = useContext(AppContext);
    const location = useLocation();
    const state = location.state;
    // state={{ boardId : board.id, page:1 }}
    // state={{ id:post.id, boardId:state.boardId, page:currentPage, search: txtSearch.current.value }}
    const postUri = `/post/anonymous/getPost/${state.id}`
    const [renderCnt, setRenderCnt] = useState(0);
    
    const [justCreated] = useState(new Map());
    const [openAddReplay] = useState(new Map());
    const [replyOnReply] = useState(new Map());

    function onInputReplyContent(e,replyId) {
        e.preventDefault();
        const content = e.target.value;
        replyOnReply.set(replyId, content);
        setRenderCnt(renderCnt+1);
  
    }

    function markShowAddReply(e, replyId){
        openAddReplay.set(replyId, 1)
        setRenderCnt(renderCnt+1);
    }


    const mngReply = async (e, parentId) => {
        e.preventDefault();
        //console.log(postId);

        if (replyOnReply.get(parentId) === null || replyOnReply.get(parentId)?.length ===0)
            return;
        // writer;	//게시물 작성자
        //content;
        //setAuth({ user, roles, accessToken, userId, userNick});
        //firstVal;private S secondVal
        const bodyData = {
            firstVal: { id: parentId },
            secondVal: { writer: { id: auth.userId, nick:auth.userNick }, content: replyOnReply.get(parentId) }
        }
        
        //console.log(bodyData);
        //console.log(JSON.stringify(bodyData));
        try {

            const response = await axios.post(
                "/post/createReply",
                bodyData, {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": `${auth.accessToken}`
                }}
            );
            
            const reply = response.data;
            justCreated.set(reply.parentId, reply)
            replyOnReply.set(parentId, "")
            setRenderCnt(renderCnt+1);
            //console.log(response?.bodyData);
            //console.log(JSON.stringify(response))
            //console.log(bodyData);
            //console.log(response);
            console.log("성공");
            //목적 : 재 조회 방지. 성능
            // parent 객체의 댓글 목록 ul 찾아서 동적으로 강제적으로 넣기
  
        } catch (err) {
            console.log('Registration Failed');
        }

    }
   
    function appendJustCreatedReply(pid, reply, parent) {
        if(pid === parent.id){
            if(! parent.listReply.includes(reply))
                parent.listReply = [reply, ...parent.listReply];
            //console.log("그림그리기 작동확인(parent.listReply)");
            //console.log(parent.listReply);
        }
    }
    
    
    function Replies({ listReply = [] }) {
        if (!listReply || listReply.length === 0)
            return "";
        return <ul>
            {listReply.map((reply) => {
                console.log(reply.openAddReplay);
                reply = {...reply, openAddReplay:false};

                return <ListGroup.Item as="li">
                    ▸▹ <span>{reply.content}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp; / <span>{displayDate(reply.regDt, reply.uptDt)}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp; / <span>{reply.writer ? reply.writer.nick : ""}</span>
                    <Button variant="btn btn-light" size='sm'onClick={(e) => { markShowAddReply(e, reply.id) }}>+댓글</Button> 
                    {openAddReplay.has(reply.id)? <NewReply auth={auth} reply={reply} replyOnReply={replyOnReply} onInputReplyContent={onInputReplyContent} mngReply={mngReply} /> :""}
                    <Replies listReply={reply.listReply} />
                </ListGroup.Item>
            })}
        </ul>
    }
}
