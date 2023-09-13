import APPContext from "context/AppContextProvider";
import { useContext, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Fetch from "toolbox/Fetch";
import { displayDate } from "toolbox/displayDate";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";


export default function PostList() {
    const { id: boardId, pageNo } = useParams(); // APP에 있는 :id 와 이름 통일  //http://localhost:8080/post/anonymous/listAll/000n
    const [byKeyWord, setByKeyWord] = useState(false);
    const [postListUri, setPostListUri] = useState(`/post/anonymous/listAll/${boardId}/${pageNo}`);
    const { auth } = useContext(APPContext);
    const isMember = auth.roles?.includes("member");
    const txtSearch = useRef("");
    
    
    const onSearch = (e) => {
        const search = txtSearch.current.value;
        e.preventDefault();

        console.log(search);
        if(search.trim()){
            setByKeyWord(true)
            const postSearchListUri = `/post/anonymous/search/${boardId}/${search}/1`;
            setPostListUri(postSearchListUri);
        } else {
            setByKeyWord(false)
            setPostListUri(`/post/anonymous/listAll/${boardId}/1`);
        }

    };

    const goto = (chosenPage) => {

        if(byKeyWord){
            const search = txtSearch.current.value;
            const postSearchListUri = `/post/anonymous/search/${boardId}/${search}/${chosenPage}`;
            setPostListUri(postSearchListUri);
        } else {
            setByKeyWord(false)
            setPostListUri(`/post/anonymous/listAll/${boardId}/${chosenPage}`);
        }


    }


    const displayPagination = (paging) => {
        const pagingBar = [];
        console.log(paging.prev);
        console.log(paging.next);
        if (paging.prev)
            pagingBar.push(<button onClick={(e)=>goto(paging.startPage - 1)}>&lt;</button>);
        for (let i = paging.startPage; i <= paging.lastPage; i++) {
            pagingBar.push(<button key={i} onClick={(e)=>goto(i)}>{i}</button>);
        }
        if (paging.next)
            pagingBar.push(<button onClick={(e)=>goto(paging.startPage + 1)}>&gt;</button>);
        return pagingBar;
    };


    function RenderSuccess(postListWithPaging) {
        console.log("postListWithPaging : "+postListWithPaging);
        console.log(postListWithPaging);
        return <> 
            <Table responsive variant="white" >
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

                    {postListWithPaging.firstVal && postListWithPaging.firstVal.map((post) => (
                        
                        <tr key={post.id}>
                            <td>
                                <Link className="link-success link-offset-2 link-underline-opacity-0 link-underline-opacity-20-hover" key={post.id} to={`/post/${post.id}`}>
                                    {post.title}
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
            {displayPagination(postListWithPaging.secondVal)}

        </>

    }


    return (
        <div>
            {/*  */}
            <div>
                <input placeholder="검색어" ref={txtSearch}></input>
                &nbsp;
                <Button variant="info" onClick={onSearch}>
                    검색
                </Button>
            </div>
            {isMember ? (
                <Link
                    className="badge bg-warning text-wrap"
                    key="0000"
                    to={`/post/new/${boardId}`}
                >
                    글쓰기
                </Link>
            ) : (
                ""
            )}
            <Fetch uri={postListUri} renderSuccess={RenderSuccess} />

        </div>
    );
}