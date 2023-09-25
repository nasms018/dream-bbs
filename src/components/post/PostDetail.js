import ThumbnailList from 'atom/ThumbnailList';
import AppContext from "context/AppContextProvider";
import { useContext } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useLocation } from 'react-router-dom';
import { Fetch } from 'toolbox/Fetch';
import { displayDate } from "toolbox/DateDisplayer";
import ReplyList from './ReplyList';

export default function PostDetail() {
    const thumbnailRequestTarget = ["video", "image"];
    const { auth } = useContext(AppContext);
    const location = useLocation();
    
    const state = location.state;
    const postUri = `/post/anonymous/getPost/${state.id}`

    return <>
        <Fetch uri={postUri} renderSuccess={RenderSuccess} />
        </>

function RenderSuccess(post){
        console.log(post);
        return <>
            <ListGroup responsive variant="white">
                <ListGroup.Item variant="dark" as="li">
                    <h3><b>{post.title}</b></h3>
                </ListGroup.Item>
                <ListGroup.Item as="li" disabled>
                    작성자 : <b>{post.writer ? post.writer.username : ""}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    ✔ : <span>{post.readCnt}&nbsp;&nbsp;</span>
                    👍 : <span>{post.likeCnt}&nbsp;&nbsp;</span>
                    😡 : <span>{post.disCnt}&nbsp;&nbsp;</span>
                    ⏱ : <span>{displayDate(post.regDt, post.uptDt)}</span>
                </ListGroup.Item>
                <ListGroup.Item as="li" style={{ height: 200 }}>{post.content}</ListGroup.Item>
                <ListGroup.Item>
                <ThumbnailList imgDtoList={post.listAttachFile}/>
                </ListGroup.Item>
                <ListGroup.Item as="li"  variant="warning">
                <Link className="badge bg-secondary text-wrap" key={state.boardId} to={`/board`} state={state}>
                    목록으로
                </Link>
                </ListGroup.Item>
                {(post.writer ? post.writer.nick === auth.userNick : false) ?
                    <ListGroup.Item as="li">
                        <Link
                            className="badge bg-info text-wrap"
                            to="/post/managePost" state={{ post: post, state }} >
                            수정
                        </Link>

                    </ListGroup.Item>
                    : ""}
                
                <ReplyList parent={post} />
            </ListGroup>
        </>
    }
}