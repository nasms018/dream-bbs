import AppContext from "context/AppContextProvider";
import { useContext, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Link, useLocation,useParams } from "react-router-dom";
import { Fetch } from "toolbox/Fetch";
import { displayDate } from "toolbox/DateDisplayer";

export default function PostList() {
    const { auth } = useContext(AppContext);
    
    const isMember = auth?.roles?.includes("member");

    const location = useLocation();
    let state = location.state;

    const txtSearch = useRef("");
    
    const [currentPage, setCurrentPage] = useState("");
    
    function buildUrl() {
        if (state.search) {
            return `/post/anonymous/search/${state.boardId}/${state.search}/${state.page}`;
        } else {
            return `/post/anonymous/listAll/${state.boardId}/${state.page}`;
        }
    }

    const [postListUri, setPostListUri] = useState(buildUrl());//initUrl
    const [targetBoard, setTargetBoard] = useState(state.boardId);

    if(targetBoard !== state.boardId){
        console.log("타겟 보드 체인지");
        setTargetBoard(state.boardId);
        setPostListUri(buildUrl());
    }

    function goTo(chosenPage) {
        state.postListWithPaging = null;
        state.page = chosenPage;
        setCurrentPage(chosenPage);
        setPostListUri(buildUrl());
    }
    
    let search = txtSearch.current.value;
    const onSearch = (e) => {
        e.preventDefault();
        state.postListWithPaging = null;
        state.search = search

        setCurrentPage(1);
        setPostListUri(buildUrl());
    };


    const displayPagination = (paging) => {
        const pagingBar = [];
        //console.log(paging.prev);
        //console.log(paging.next);
        if (paging.prev)
            pagingBar.push(<button key={paging.startPage - 1} onClick={(e) => goTo(paging.startPage - 1)}>&lt;</button>);
        for (let i = paging.startPage; i <= paging.lastPage; i++) {
            pagingBar.push(<button key={i} onClick={(e) => goTo(i)}>{i}</button>);
        }
        if (paging.next)
            pagingBar.push(<button key={paging.startPage + 1} onClick={(e) => goTo(paging.startPage + 1)}>&gt;</button>);
        return pagingBar;
    };

    function renderSuccess(postListWithPaging) {

        const postList = postListWithPaging.firstVal;
        const pagination = postListWithPaging?.secondVal;
        return <>
            <Table responsive variant="white" >
                <thead>
                    <tr>
                        <th width="50%">제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>좋아요</th>
                        <th>최종수정일</th>
                    </tr>
                </thead>
                <tbody>

                    {postList?.map((post) => (
                        <tr key={post.id}>
                            <td>
                                <Link className="link-success link-offset-2 link-underline-opacity-0 link-underline-opacity-20-hover"
                                    key={post.id} to={`/post/${post.id}`}
                                    
                                    state={{ id: post.id, boardId: state.boardId, page: state.page, search: txtSearch.current?.value, postListWithPaging }}>
                                    <b>{post.title}</b>
                                </Link>
                            </td>
                            <td>{post.writer ? post.writer.name : ""}</td>
                            <td>{post.readCnt}</td>
                            <td>{post.likeCnt}</td>
                            <td>
                                <span>{displayDate(post.regDt, post.uptDt)}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {pagination ? displayPagination(pagination) : ""}
        </>
    }

    return (
        <div>
            <input placeholder="검색어" ref={txtSearch}></input>
            &nbsp;
            <Button key={"btnSearch"} variant="info" onClick={onSearch}>
                검색
            </Button>

            {isMember ? (
                <Link
                    className="badge bg-warning text-wrap"
                    to="/post/managePost"
                    currentPage={currentPage}
                    state={{ post: { boardVO: { id: state.boardId }, listAttachFile:[] } }}>
                    글쓰기
                </Link>
            ) : (
                ""
            )}
            <Fetch uri={postListUri} renderSuccess={renderSuccess} />
        </div>
    );
}