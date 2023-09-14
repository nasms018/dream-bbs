import AppContext from "context/AppContextProvider";
import { useContext, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { displayDate } from "toolbox/displayDate";
import ListGroup from 'react-bootstrap/ListGroup';
import Toast from 'react-bootstrap/Toast';
import Fetch from 'toolbox/Fetch';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'api/axios';

export default function PostDetail() {
    const { auth } = useContext(AppContext);
    const location = useLocation();
    const state = location.state;
    // state={{ boardId : board.id, page:1 }}
    // state={{ id:post.id, boardId:state.boardId, page:currentPage, search: txtSearch.current.value }}
    const postUri = `/post/anonymous/getPost/${state.id}`
    const [content, setContent] = useState();


    const mngReply = async (e, postId) => {
        e.preventDefault();
        console.log(postId);
        if (e.key === "Enter") { 
            mngReply(e);
        }
;

        if(content == null)
            return;


           // writer;	//게시물 작성자

  //content;
  //setAuth({ user, roles, accessToken, userId, userNick});
//firstVal;private S secondVal
            const bodyData = { firstVal:{id:postId}, secondVal:{id:auth.userId}, content:content}

              
              //console.log(bodyData);
              //console.log(JSON.stringify(bodyData));
              try {
                const response = await axios.post(
                  "/post/createReply",
                  bodyData, {
                    headers: {
                      'Content-Type': 'application/json',
                      "x-auth-token": `${auth.accessToken}`
                    }
                }
                );
                //console.log(response?.bodyData);
                //console.log(JSON.stringify(response))
                console.log(response);
                console.log("성공");
               //목적 : 재 조회 방지. 성능
               // parent 객체의 댓글 목록 ul 찾아서 동적으로 강제적으로 넣기
          
              } catch (err) {
                console.log('Registration Failed');
              }

    }
    return (<>
        <Fetch uri={postUri} renderSuccess={RenderSuccess} />
    </>
    )

    function onEnter(e) {
        if (e.key === "Enter") { }
    }


    function RenderSuccess(post) {
        console.log(post);
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

                {(post.writer ? post.writer.username === auth.userNick : false) ?
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
                    <Link className="badge bg-info text-wrap" key={state.boardId} to={`/board`} state={state}>목록으로</Link>

                <ListGroup.Item as="li">
                    {addReply()}
                </ListGroup.Item>
                <ListGroup.Item as="li"><Replies className="badge bg-danger text-wrap" listReply={post.listReply} /></ListGroup.Item>
            </ListGroup>
        </>
    }

    function addReply(post) {
        if (!auth.userNick)
            return;
        return (
            <FloatingLabel
                controlId="floatingInput"
                label="댓글달기(Enter)"
                className="mb-3"
                >
                <Form.Control type="text" onChange={(e)=>{setContent(e.target.value)}} />
                <Button variant="primary" onClick={(e)=>{mngReply(e, post.id)}}>댓글달기</Button>
            </FloatingLabel>
        );
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
}


